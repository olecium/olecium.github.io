import React, { useState, useEffect, useContext, createContext } from "react";

import { getMetricsCollection } from "Common/constants/FireStorePaths";

import { IMachineMetricsMap, IMachineMetrics } from "Common/interfaces/IMachineMetrics";
import { isUndefinedOrEmpty } from "Common/utils/typeGuards";


import { firestore } from "Storage";

export interface IMachineMetricsContext {
    machineMetrics: IMachineMetricsMap;
    machineMetricsError: Error | undefined;
}

type DefaultValue = undefined;
export type MachineMetricsContextValue = IMachineMetricsContext | DefaultValue;

const MachineMetricsContext = createContext<MachineMetricsContextValue>(undefined);
export const MachineMetricsContextProvider = MachineMetricsContext.Provider;
export const MachineMetricsContextConsumer = MachineMetricsContext.Consumer;

export interface IMachineMetricsProviderProps {
    customerId: string | undefined;
    children?: React.ReactNode;
}
export const MachineMetricsProvider: React.FC<IMachineMetricsProviderProps> = ({ customerId, children }) => {
    const authContext = useMachineMetricsProvider(customerId);
    return <MachineMetricsContextProvider value={authContext}>{children}</MachineMetricsContextProvider>;
};

export const useMachineMetrics = () => {
    const context = useContext(MachineMetricsContext);
    if (context === undefined) {
        throw new Error('useManagerActions must be used within a ManagerActionsProvider')
    }
    return context
};

/// https://medium.com/firebase-tips-tricks/how-to-drastically-reduce-the-number-of-reads-when-no-documents-are-changed-in-firestore-8760e2f25e9e

const convertArray = (data: Array<any>): Array<IMachineMetrics> => {
    const result: Array<IMachineMetrics> = data.map((d) => {
        const metric: IMachineMetrics = {
            date: d.date.toDate(),
            fVends: d.fVends,
            sVends: d.sVends,
        };
        return metric;
    }
    );

    return result;
};

function useMachineMetricsProvider(customerId: string | undefined): IMachineMetricsContext {
    const [machineMetrics, setMachineMetrics] = useState<IMachineMetricsMap>({});
    const [error, setError] = React.useState<Error | undefined>(undefined);

    useEffect(() => {
        console.log(`useMachineMetricsProvider.mounted.machineMetrics`);
        let unsubscribe: any = undefined;
        let mounted: boolean = true;

        const getData = async (): Promise<void> => {
            setError(undefined);
            if (!isUndefinedOrEmpty(customerId)) {
                const rootCollection = getMetricsCollection(customerId);
                try {
                    if (rootCollection) {
                        unsubscribe = firestore.collection(rootCollection)
                            .onSnapshot({ includeMetadataChanges: true }, (querySnapshot) => {
                                if (mounted) {
                                    querySnapshot.docChanges().forEach(async function (change) {
                                        const machineId: string = change.doc.id;
                                        switch (change.type) {
                                            case `added`:
                                            case `modified`:
                                                {
                                                    const record = change.doc.data();
                                                    const array = convertArray(record.data);
                                                    setMachineMetrics(prevState => ({ ...prevState, [machineId]: array }));
                                                }
                                                break;

                                            case `removed`:
                                                setMachineMetrics(prevState => {
                                                    const state: IMachineMetricsMap = {};
                                                    for (const k in prevState) {
                                                        if (k !== machineId) {
                                                            state[k] = prevState[k];
                                                        }
                                                    }
                                                    return state;
                                                });
                                                break;

                                            default:
                                                break;
                                        }
                                    });
                                }
                            });
                    }
                }
                catch (error) {
                    if (mounted) setError(error);
                }
            }
            else {
                setError(new Error(`Invalid customer UID ${customerId}`))
            }
        };

        getData();

        return function cleanup() {
            console.log(`useMachineMetricsProvider.mounted.machineMetrics.cleanup`);
            mounted = false;
            if (unsubscribe) {
                unsubscribe();
            }
        };

    }, [customerId]);

    const result: IMachineMetricsContext = {
        machineMetrics: machineMetrics,
        machineMetricsError: error,
    };

    return result;
};
