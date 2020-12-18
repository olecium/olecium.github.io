import React from "react";
import {IBook} from "../common/interfaces/IBook";
import {IAuthor} from "../common/interfaces/IAuthor";
import {Book, IBookProps} from "../Book/Book";
import {firestore} from "../../Storage";
import {useAuth} from "../Login/hooks/useAuth";


const BookList: React.FC = (): React.ReactElement => {

    const {user} = useAuth();

    const [books, setBooks] = React.useState<IBook[]>([]);
    const [authors, setAuthors] = React.useState<IAuthor[]>([]);
    const [bookProps, setBookProps] = React.useState<IBookProps[]>([]);

    React.useEffect(() => {

        const getData = async (): Promise<void> => {
            try {

                if(user === undefined || user === null) return;
                const bookSnapshot = await firestore.collection('books').get();
                const authorSnapshot = await firestore.collection('authors').get();
                const bks: IBook[] = [];

                bookSnapshot.docs.forEach((doc) => {
                    const d = doc.data();

                    const b: IBook = {
                        id: d.id,
                        image: d.image,
                        author_id: d.author_id,
                        description: d.description,
                        language: d.language,
                        title: d.title,
                        file: d.file
                    }
                    bks.push(b);
                });

                const aths: IAuthor[] = [];

                authorSnapshot.docs.forEach((doc) => {
                    const d = doc.data();

                    const a: IAuthor = {
                        id: doc.id,
                        name: d.name,
                        surname: d.surname,
                        description: d.description,
                    }
                    aths.push(a);
                });

                setBooks(bks);
                setAuthors(aths);
            }
            catch(err) {
                console.log(err);
            }
        };

        getData();

    }, [user]);

    React.useEffect(() => {
        if(books.length > 0 && authors.length > 0){

            const result: IBookProps[] = [];

            for(let i = 0; i< books.length; i++) {
                const b = books[i];
                const a = authors.find((a) => a.id === b.author_id);
                const bp: IBookProps = {
                    ...b,
                    authorName: a ? `${a.name} ${a.surname}` : `Unknown`
                };
                result.push(bp);
            }
            setBookProps(result);
        }
    }, [books, authors]);

    return(
        <div>
            <p>hello</p>
            <ul>
            {
                bookProps.map((b) => {
                     return(
                         <li key={b.id}>
                            <div>
                                <Book {...b} />
                            </div>
                         </li>
                    );
                })
            }
            </ul>
        </div>
    );
};

export default BookList;
