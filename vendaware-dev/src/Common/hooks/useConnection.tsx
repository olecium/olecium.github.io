import { useAuth } from "Login/hooks/useAuth";
import React, { useState, useEffect, useContext, createContext } from "react";

export interface IConnectContext {
    connected: boolean;
}

type DefaultValue = undefined;
export type ConnectedContextValue = IConnectContext | DefaultValue;

const ConnectedContext = createContext<ConnectedContextValue>(undefined);
export const ConnectedContextProvider = ConnectedContext.Provider;
export const ConnectedContextConsumer = ConnectedContext.Consumer;

export const ConnectedProvider: React.FC = ({ children }) => {
    const connectedContext = useConnectedProvider();
    return <ConnectedContextProvider value={connectedContext}>{children}</ConnectedContextProvider>;
};

export const useConnected = () => {
    const context = useContext(ConnectedContext);
    if (context === undefined) {
        throw new Error('useConnected must be used within a ConnectedProvider')
    }
    return context
};

function useConnectedProvider(): IConnectContext {
    const [connected, setConnected] = useState<boolean>(navigator.onLine);
    const { userInfo } = useAuth();

    useEffect(() => {
        const onConnectionChange = async (event: Event): Promise<void> => {
            console.log(`onConnectionChange event '${event.type}' Network Online: ${navigator.onLine}`);
            if (event.type === 'offline') {
                setConnected(false);
            }
            if (event.type === 'online') {
                setConnected(true);
            }
        };

        console.log(`useConnectedProvider.mounted`);
        window.addEventListener('offline', onConnectionChange);
        window.addEventListener('online', onConnectionChange);

        return function cleanup() {
            console.log(`useConnectedProvider.cleanup`);
            window.removeEventListener('offline', onConnectionChange);
            window.removeEventListener('online', onConnectionChange);
        };
    }, [userInfo]);

    return {
        connected,
    } as const;
};