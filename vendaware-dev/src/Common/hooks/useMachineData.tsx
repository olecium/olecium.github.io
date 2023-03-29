import { getMachinesCollection } from "Common/constants/FireStorePaths";
import { IMachineData, IMachineDataMap } from "Common/interfaces/IMachineData";
import { isUndefinedOrEmpty } from "Common/utils/typeGuards";
import React, { useState, useEffect, useContext, createContext } from "react";

import { firestore } from "Storage";

export interface IMachineDataContext {
    machineData: IMachineDataMap;
    machineDataError: Error | undefined;
}

type DefaultValue = undefined;
export type MachineDataContextValue = IMachineDataContext | DefaultValue;

const MachineDataContext = createContext<MachineDataContextValue>(undefined);
export const MachineDataContextProvider = MachineDataContext.Provider;
export const MachineDataContextConsumer = MachineDataContext.Consumer;

export interface IMachineDataProviderProps {
    customerId: string | undefined;
    children?: React.ReactNode;
}
export const MachineDataProvider: React.FC<IMachineDataProviderProps> = ({ customerId, children }) => {
    const authContext = useMachineDataProvider(customerId);
    return <MachineDataContextProvider value={authContext}>{children}</MachineDataContextProvider>;
};

export const useMachineData = () => {
    const context = useContext(MachineDataContext);
    if (context === undefined) {
        throw new Error('useManagerActions must be used within a ManagerActionsProvider')
    }
    return context
};

/// https://medium.com/firebase-tips-tricks/how-to-drastically-reduce-the-number-of-reads-when-no-documents-are-changed-in-firestore-8760e2f25e9e

function useMachineDataProvider(customerId: string | undefined): IMachineDataContext {
    const [machineData, setMachineData] = useState<IMachineDataMap>({});
    const [error, setError] = React.useState<Error | undefined>(undefined);

    useEffect(() => {
        console.log(`useMachineDataProvider.mounted.machineData`);
        let unsubscribe: any = undefined;
        let mounted: boolean = true;

        const getData = async (): Promise<void> => {
            setError(undefined);
            if (!isUndefinedOrEmpty(customerId)) {
                const rootCollection = getMachinesCollection(customerId);
                try {
                    if (rootCollection) {
                        unsubscribe = firestore.collection(rootCollection)
                            .onSnapshot({ includeMetadataChanges: true }, (querySnapshot) => {
                                if (mounted) {
                                    querySnapshot.docChanges().forEach(async function (change) {
                                        const record = change.doc.data();
                                        record.installed = record.installed.toDate();
                                        const machineId: string = record.id;

                                        switch (change.type) {
                                            case `added`:
                                            case `modified`:
                                                {
                                                    const machineData: IMachineData = {
                                                        address: record.address,
                                                        id: record.id,
                                                        installed: record.installed,
                                                        location: record.location,
                                                        sVersion: record.sVersion,
                                                        uid: change.doc.id,    //  Google firestore UID
                                                    }
                                                    setMachineData(prevState => ({ ...prevState, [machineId]: machineData }));
                                                }
                                                break;

                                            case `removed`:
                                                {
                                                    setMachineData(prevState => {
                                                        const state: IMachineDataMap = {};
                                                        for (const k in prevState) {
                                                            if (k !== machineId) {
                                                                state[k] = prevState[k];
                                                            }
                                                        }
                                                        return state;
                                                    });
                                                }
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
            console.log(`useMachineDataProvider.mounted.machineData.cleanup`);
            mounted = false;
            if (unsubscribe) {
                unsubscribe();
            }
        };

    }, [customerId]);

    const result: IMachineDataContext = {
        machineData,
        machineDataError: error,
    };

    return result;
};
