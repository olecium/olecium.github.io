import React, { useState, useEffect, useContext, createContext } from"react";
import {IUser, IUsersMap} from "../interfaces/IUser";
import {firestore} from "../../../Storage";
import {useAuth} from "../../Login/hooks/useAuth";

interface IUserUpdateContext {
    users: IUsersMap;
    errorUser: Error | undefined;
}

const UserUpdateContextValue = createContext<IUserUpdateContext>({} as IUserUpdateContext);
export const UserUpdateValueProvider = UserUpdateContextValue.Provider;
export const UserUpdateValueConsumer = UserUpdateContextValue.Consumer;

export const UserUpdateProvider: React.FC = ({children}) => {
    const Context = useUserUpdateProvider();
    return <UserUpdateValueProvider value={Context}>{children}</UserUpdateValueProvider>
}

export const useUserUpdate = () => {
    const Context = useContext(UserUpdateContextValue);
    if (Context === undefined) {
        throw new Error(`useUserUpdate must be used within a UserUpdateProvider`);
    }
    return Context;
}

type IUnsubscribe = () => void;

function useUserUpdateProvider(): IUserUpdateContext {
    const [users, setUsers] = useState<IUsersMap>({});
    const [errorUser, setError] = useState<Error | undefined>(undefined);
    const {user} = useAuth();


    useEffect(() => {
        let isMounted: boolean = true;
        let unsubscribe: IUnsubscribe | undefined = undefined;

        const getData = async (): Promise<void> => {
            try {

                if(user === undefined || user === null || unsubscribe !== undefined) return;

                unsubscribe = firestore.collection('users').onSnapshot((querySnapshot) => {
                    querySnapshot.docChanges().forEach((change) => {
                        const d = change.doc.data();
                        const t = change.type;
                                                
                        switch(t){
                            case 'added':
                            case 'modified': {
                                const u: IUser = {
                                    id: d.id,
                                    email: d.email,
                                    forename: d.forename,
                                    surname: d.surname,
                                    role_id: d.role_id,
                                    org_id: d.org_id
                                };
                                if(isMounted) {
                                    setUsers(prevState => ({...prevState, [u.id]: u}));
                                }
                                break;
                            }
                            case 'removed': {

                                if(isMounted) {

                                    setUsers(prevState => {
                                        const state: IUsersMap = {};
                                        for (const k in prevState) {
                                            if (k !== d.id) {
                                                state[k] = prevState[k];
                                            }
                                        }
                                        return state;
                                    });
                                }
                                break;
                            }
                        }
                    });
                });
            }
            catch(err) {
                if(isMounted) {
                    setError(err);
                }
            }
        };
        getData();

        return function cleanup() {
            isMounted = false;
            if(unsubscribe){
                unsubscribe();
            }
        };
    }, [user]);

    const result: IUserUpdateContext = {
        users,
        errorUser
    };

    return result;
}
