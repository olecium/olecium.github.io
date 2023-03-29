import React, { useState, useEffect, useContext, createContext } from"react";
import {IBook, IBookMap} from "../interfaces/IBook";
import {firestore} from "../../../Storage";
import {useAuth} from "../../Login/hooks/useAuth";

interface IBookUpdateContext {
    books: IBookMap;
    errorBook: Error | undefined;
}

const BookUpdateContextValue = createContext<IBookUpdateContext>({} as IBookUpdateContext);
export const BookUpdateValueProvider = BookUpdateContextValue.Provider;
export const BookUpdateValueConsumer = BookUpdateContextValue.Consumer;

export const BookUpdateProvider: React.FC = ({children}) => {
    const Context = useBookUpdateProvider();
    return <BookUpdateValueProvider value={Context}>{children}</BookUpdateValueProvider>
}

export const useBookUpdate = () => {
    const Context = useContext(BookUpdateContextValue);
    if (Context === undefined) {
        throw new Error(`useBookUpdate must be used within a BookUpdateProvider`);
    }
    return Context;
}

type IUnsubscribe = () => void;

function useBookUpdateProvider(): IBookUpdateContext {
    const [books, setBooks] = useState<IBookMap>({});
    const [errorBook, setError] = useState<Error | undefined>(undefined);
    const {user} = useAuth();


    useEffect(() => {
        let isMounted: boolean = true;
        let unsubscribe: IUnsubscribe | undefined = undefined;

        const getData = async (): Promise<void> => {
            try {

                if(user === undefined || user === null || unsubscribe !== undefined) return;

                unsubscribe = firestore.collection('books').onSnapshot((querySnapshot) => {
                    querySnapshot.docChanges().forEach((change) => {
                        const d = change.doc.data();
                        const t = change.type;
                                                
                        switch(t){
                            case 'added':
                            case 'modified': {
                                const b: IBook = {
                                    id: d.id,
                                    image: d.image,
                                    author_id: d.author_id,
                                    description: d.description,
                                    language: d.language,
                                    title: d.title,
                                    file: d.file
                                };
                                if(isMounted) {
                                    setBooks(prevState => ({...prevState, [b.id]: b}));
                                }
                                break;
                            }
                            case 'removed': {

                                if(isMounted) {

                                    setBooks(prevState => {
                                        const state: IBookMap = {};
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

    const result: IBookUpdateContext = {
        books,
        errorBook
    };

    return result;
}
