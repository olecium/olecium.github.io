import React from "react";
import {Book, IBookProps} from "../Book/Book";
import css from "./BookList.module.scss";
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

const BookList: React.FC = (): React.ReactElement => {

    const {user} = useAuth();
    const {books} = useBookUpdate();
    const {authors} = useAuthorUpdate();
    const {favouriteBooks} = useFavouriteBookUpdates();
    const columnId = 'column-1';

    const [bookProps, setBookProps] = React.useState<IBookProps[]>([]);
    const [languages, setLanguages]= React.useState<ILanguageMap>({});

    const addToFavourite = async (bookId: string, fav: boolean) => {
        try {
            if (user === undefined || user === null) return;
            const booksRef = await firestore.collection("user_favourite_books").doc(user.uid);
            if (fav) {
                const removeBook = booksRef.update({
                    books: await firebase.firestore.FieldValue.arrayRemove(bookId)
                });
                if (removeBook) {
                    console.log('unselected')
                } else {
                    console.log('error')
                }
            } else {
                const addBook = booksRef.update({
                    books: await firebase.firestore.FieldValue.arrayUnion(bookId)
                });
            }
        } catch(err) {
            console.log(err);
        }
    }

    const deleteBook = async (bookId: string) => {

        try {
            if(user === undefined || user === null) return;
            await firestore.collection("books").doc(bookId).delete();
            const bookCategoriesSnapshot = await firestore.collection("category_books").get();
            const docs = bookCategoriesSnapshot.docs;
            for(const doc of docs) {
                const d = doc.data();
                if (d.book_id === bookId) {
                    await firestore.collection("category_books").doc(doc.id).delete();

                    const storageRef = await firebase.storage().ref();
                    const fileRef =  storageRef.child(`books/pdf/${bookId}`);
                    const imageRef =  storageRef.child(`books/covers/${bookId}-cover`);
                    imageRef.delete();
                    fileRef.delete();
                }
            }
        } catch(err) {
            console.log(err);
        }

    }

    const onDragEnd = (result: any) => {
        const {destination, source, draggableId} = result;
        if(!destination) {
            return;
        }
        if(
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        const newBookOrder = Array.from(bookProps);
        const draggedBook = newBookOrder.filter(x => x.id === draggableId);

        newBookOrder.splice(source.index, 1);
        newBookOrder.splice(destination.index, 0, draggedBook[0]);

        setBookProps(newBookOrder);
    }

    React.useEffect(() => {

        const getLanguages = async (): Promise<void> => {
            try {

                if(user === undefined || user === null) return;
                const languages: ILanguage[] = [];
                const langSnapshot = await firestore.collection('languages').get();
                langSnapshot.docs.forEach((doc) => {
                    const l = doc.data();

                    const lang: ILanguage = {
                        id: l.id,
                        title: l.title
                    }
                    languages.push(lang);
                });

                const languagesMap: ILanguageMap = {};
                for (const l of languages) {
                    languagesMap[l.id] = l.title;
                }
                setLanguages(languagesMap);
            } catch (err) {
                console.log(err);
            }
        }
        getLanguages();

    },[user]);



    React.useEffect(() => {

        if(Object.keys(books).length > 0 && Object.keys(authors).length > 0  && Object.keys(languages).length > 0 ){

            const result: IBookProps[] = [];

            for(const k in books) {
                const b = books[k];
                const a = authors[b.author_id];
                const langTitle = languages[b.language];

                const fav = favouriteBooks.indexOf(b.id) !== -1;

                const bp: IBookProps = {
                    ...b,
                    authorName: a ? `${a.name} ${a.surname}` : `Unknown`,
                    langTitle: langTitle,
                    fav: fav
                };
                result.push(bp);

            }
            setBookProps(result);
        }
    }, [books, authors, favouriteBooks, languages ]);


    return(
        <DragDropContext onDragEnd={onDragEnd}>
            <div>
                <h1>Список книг</h1>
                <Droppable direction="horizontal" droppableId={columnId}>
                    {provided => (
                        <ul className={css.books__list} ref={provided.innerRef} {...provided.droppableProps}>
                        {
                            bookProps.map((b, index) => {
                                return (
                                    <Book {...b} key={b.id} index={index} deleteBook={deleteBook} addToFavourite={addToFavourite}/>
                                )
                            })
                        }
                        {provided.placeholder}
                        </ul>
                    )}
                </Droppable>
            </div>
        </DragDropContext>
    );
};

export default BookList;
