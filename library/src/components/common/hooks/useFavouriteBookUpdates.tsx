import React, {createContext, useContext, useState} from "react";
import {useAuth} from "../../Login/hooks/useAuth";
import {firestore} from "../../../Storage";
import firebase from 'firebase/app';

interface IFavouriteUpdateContext {
    favouriteBooks: string[];
    errorFavBooks: Error | undefined;
}

const FavouriteUpdateContextValue = createContext<IFavouriteUpdateContext>({} as IFavouriteUpdateContext);
export const FavouriteUpdateValueProvider = FavouriteUpdateContextValue.Provider;
export const FavouriteUpdateValueConsumer = FavouriteUpdateContextValue.Consumer;

export const FavouriteUpdateProvider:React.FC = ({children}) => {
    const Context = useFavouriteBookUpdateProvider();
    return <FavouriteUpdateValueProvider value={Context}>{children}</FavouriteUpdateValueProvider>
}

export const useFavouriteBookUpdates = () => {
    const Context = useContext(FavouriteUpdateContextValue);
    if(Context === undefined) {
        throw new Error(`useFavouriteUpdate must be used within a FavouriteUpdateProvider`);
    }
    return Context;
}

type IUnsubscribe = () => void;

function useFavouriteBookUpdateProvider(): IFavouriteUpdateContext {
    const [favouriteBooks, setFavouriteBooks] = useState<string[]>([]);
    const [errorFavBooks, setError] = useState<Error | undefined>(undefined);
    const {user} = useAuth();

    React.useEffect(() => {
        let unsubscribe: IUnsubscribe | undefined = undefined;
        let isMounted: boolean = true;

        const getData = async (): Promise<void> => {
            try {
                if(user === undefined || user === null) return;
                unsubscribe = firestore.collection('user_favourite_books')
                                .where(firebase.firestore.FieldPath.documentId(), '==', user.uid)
                                .onSnapshot((querySnapshot) => {
                                    querySnapshot.docChanges().forEach((change) => {
                                        const d: string[] = change.doc.data().books as string[];

                                        const t = change.type;

                                        switch(t){
                                            case "added":
                                            case "modified": {
                                                if(isMounted) {
                                                    setFavouriteBooks(d);
                                                }
                                                break;
                                            }
                                            case "removed": {
                                                setFavouriteBooks([]);
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

    const result: IFavouriteUpdateContext = {
        favouriteBooks,
        errorFavBooks
    }
    return result;
}
