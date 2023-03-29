import {IAuthor, IAuthorsMap} from "../interfaces/IAuthor";
import React, {createContext, useContext, useState} from "react";
import {useAuth} from "../../Login/hooks/useAuth";
import {firestore} from "../../../Storage";

interface IAuthorUpdateContext {
    authors: IAuthorsMap;
    errorAuthor: Error | undefined;
}

const AuthorUpdateContextValue = createContext<IAuthorUpdateContext>({} as IAuthorUpdateContext);
export const AuthorUpdateValueProvider = AuthorUpdateContextValue.Provider;
export const AuthorUpdateValueConsumer = AuthorUpdateContextValue.Consumer;

export const AuthorUpdateProvider:React.FC = ({children}) => {
    const Context = useAuthorUpdateProvider();
    return <AuthorUpdateValueProvider value={Context}>{children}</AuthorUpdateValueProvider>
}

export const useAuthorUpdate = () => {
    const Context = useContext(AuthorUpdateContextValue);
    if(Context === undefined) {
        throw new Error(`useAuthorUpdate must be used within a AuthorUpdateProvider`);
    }
    return Context;
}

type IUnsubscribe = () => void;

function useAuthorUpdateProvider(): IAuthorUpdateContext {
    const [authors, setAuthors] = useState<IAuthorsMap>({});
    const [errorAuthor, setError] = useState<Error | undefined>(undefined);
    const {user} = useAuth();

    React.useEffect(() => {
        let unsubscribe: IUnsubscribe | undefined = undefined;
        let isMounted: boolean = true;

        const getData = async (): Promise<void> => {
            try {
                if(user === undefined || user === null) return;
                unsubscribe = firestore.collection('authors').onSnapshot((querySnapshot) => {
                    querySnapshot.docChanges().forEach((change) => {
                        const d = change.doc.data();
                        const t = change.type;

                        switch(t){
                            case "added":
                            case "modified": {
                                const a: IAuthor = {
                                    id: d.id,
                                    name: d.name,
                                    surname: d.surname,
                                    description: d.description,
                                }

                                if(isMounted) {
                                    setAuthors(prevState => ({...prevState, [a.id]: a}))
                                }
                                break;
                            }
                            case "removed": {
                                console.log(`Author was removed`);
                                break;
                            }
                        }
                    })
                });

            }
            catch (err) {
                if(isMounted) {
                    setError(err);
                }
            }
        }

        getData();

        return function cleanup () {
            isMounted = false;
            if(unsubscribe){
                unsubscribe();
            }
        }
    }, [user])

    const result: IAuthorUpdateContext = {
        authors,
        errorAuthor
    }
    return result;
}
