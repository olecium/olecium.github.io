import React from "react";
import {Author, IAuthorProps} from "../Author/Author";
import css from "./AuthorsList.module.scss";
import {useBookUpdate} from "../common/hooks/useBookUpdate";
import {useAuthorUpdate} from "../common/hooks/useAuthorUpdates";
import {firestore} from "../../Storage";
import firebase from "firebase";
import {ILanguage, ILanguageMap} from "../common/interfaces/ILanguage";
import {useAuth} from "../Login/hooks/useAuth";
import { Droppable} from "react-beautiful-dnd";
import { DragDropContext } from "react-beautiful-dnd";
import {useFavouriteBookUpdates} from "../common/hooks/useFavouriteBookUpdates";

export interface IFavouriteBook {
    [index: number]: string;
}

const AuthorsList: React.FC = (): React.ReactElement => {

    const {user} = useAuth();
    const {books} = useBookUpdate();
    const {authors} = useAuthorUpdate();

    const [authorProps, setAuthorProps] = React.useState<IAuthorProps[]>([]);
    const [languages, setLanguages]= React.useState<ILanguageMap>({});
    

    React.useEffect(() => {

        if(Object.keys(authors).length > 0){

            const result: IAuthorProps[] = [];

            for(const k in authors) {
                const a = authors[k];
               
                const bp: IAuthorProps = {
                    ...a
                };
                result.push(bp);

            }
            setAuthorProps(result);
        }
    }, [ authors ]);

    const deleteAuthor = async (authorId: string) => {
        try {
            if(user === undefined || user === null) return;
            await firestore.collection("authors").doc(authorId).delete();
        } 
        catch(err) {
                console.log(err);
            }
    }

    return(
            <div>
                <h1>Список книг</h1>
                        <ul className={css.books__list}>
                        {
                            authorProps.map(a => {
                                return (
                                    <Author {...a} deleteAuthor={deleteAuthor}/>
                                )
                            })
                        }
                        </ul>
            </div>
    );
};

export default AuthorsList;
