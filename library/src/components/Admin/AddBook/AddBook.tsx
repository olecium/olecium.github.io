import React from "react";
import css from "./AddBook.module.scss";
import {firestore} from "../../../Storage";
import {IAuthor} from "../../common/interfaces/IAuthor";
import {useAuth} from "../../Login/hooks/useAuth";
import {ICategory} from "../../common/interfaces/ICategory";
import firebase from "firebase";

export const uploadFileReturnUrl = async (file: File, storagePath: string): Promise<string> => {
    const storageRef = firebase.storage().ref();
    const toStore = storageRef.child(storagePath);
    const snapshot: firebase.storage.UploadTaskSnapshot = await toStore.put(file);
    const url: string = await snapshot.ref.getDownloadURL();
    return url;
}

type SetStringState = (value: (((prevState: string) => string) | string)) => void;

const AddBook: React.FC = (): React.ReactElement => {

    const {user} = useAuth();
    const [error, setError] = React.useState<string>(``);
    const [authors, setAuthors] = React.useState<IAuthor[]>([]);
    const [categories, setCategories] = React.useState<ICategory[]>([]);
    const [authorId, setAuthorId] = React.useState<string>(``);
    const [authorName, setAuthorName] = React.useState<string>(``);
    const [authorSurname, setAuthorSurname] = React.useState<string>(``);
    const [searchTerm, setSearchTerm] = React.useState(``);
    const [searchResults, setSearchResults] = React.useState<IAuthor[]>([]);
    const [title, setTitle] = React.useState<string>(``);
    const [bookImage, setBookImage] = React.useState<File|undefined>(undefined);
    const [bookFile, setBookFile] = React.useState<File|undefined>(undefined);
    const [language, setLanguage] = React.useState<string>(``);
    const [description, setDescription] = React.useState<string>(``);
    const [categoriesIds, setCategoriesIds] = React.useState<string[]>([]);

    React.useEffect(() => {

        const getAuthors = async (): Promise<void> => {
            try {
                if(user === undefined || user === null) return;
                const authorSnapshot = await firestore.collection('authors').get();

                const auths: IAuthor[] = [];

                authorSnapshot.docs.forEach((doc) => {
                    const d: IAuthor = doc.data() as IAuthor;
                    /*
                    const a: IAuthor = {
                        id: d.id,
                        name: d.name,
                        surname: d.surname,
                        description: d.description
                    }*/
                    auths.push(d);
                });

                setAuthors(auths);
            }
            catch (err) {
                console.log(err);
            }
        }
        getAuthors();
    }, []);


    React.useEffect(() => {

        const getCategories = async (): Promise<void> => {
            try {
                if(user === undefined || user === null) return;
                const categoriesSnapshot = await firestore.collection('categories').get();

                const categs: ICategory[] = [];

                categoriesSnapshot.docs.forEach((doc) => {
                    const c = doc.data();

                    const a: ICategory = {
                        id: c.id,
                        title: c.title
                    }
                    categs.push(a);
                });

                setCategories(categs);
            }
            catch (err) {
                console.log(err);
            }
        }
        getCategories();
    }, []);

    React.useEffect(() => {
        if(searchTerm !== ``) {
            const result = authors.filter((author) => {
                const surname = author.surname;
                return surname.toLowerCase().includes(searchTerm.toLocaleLowerCase())
            });
            setSearchResults(result);
        } else {
            setSearchResults([]);
        }
    }, [searchTerm]);

    const changeItemValue = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>, setState: SetStringState, fieldName: string): void => {
        const v = e.target.value as string;
        if(v && v !== '') {
            setState(v);
        } else {
            const err = `Please choose ${fieldName}`;
            setError(err);
        }
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    }

    const onCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const catId = e.target.value;
        let categs = categoriesIds;

        if(categs.includes(catId)) {
            categs = categs.filter(c => c !== catId);
        } else {
            categs.push(catId);
        }
        setCategoriesIds(categs);
    }

    const onChooseAuthor = (e: React.MouseEvent<HTMLElement>, author: IAuthor) => {
        setAuthorId(author.id);
        setAuthorName(author.name);
        setAuthorSurname(author.surname);
        setSearchTerm(``);
    }

    const handleBookFile = (e: React.ChangeEvent<HTMLInputElement>): void => {
        if (e.target.files !== null) {
            const file = e.target.files[0];
            setBookFile(file);
        }
    }
    const handleImageFile = (e: React.ChangeEvent<HTMLInputElement>): void => {
        if (e.target.files !== null) {
            const file = e.target.files[0];
            setBookImage(file);
        }
    }



    const onBookAdd = async (e: React.FormEvent): Promise<void> => {
        e.preventDefault();

        if(bookFile && bookImage) {
            const bookTitle = title.replace(/\s/g, '_');

            const fileStoragePath: string = `books/${authorSurname}_${authorName}/${bookTitle}/${bookTitle}`;
            const imageStoragePath: string = `books/${authorSurname}_${authorName}/${bookTitle}/${bookTitle}-cover`;
            const fileUrl: string = await uploadFileReturnUrl(bookFile, fileStoragePath);
            const imageUrl: string = await uploadFileReturnUrl(bookImage, imageStoragePath);

            const bookId = firestore.collection('books').doc().id;
            firestore.collection('books').doc(bookId).set({
                id: bookId,
                title: title,
                author_id: authorId,
                description: description,
                image: imageUrl,
                file: fileUrl,
                language: language,
            })
            .then(function() {
                console.log("Book successfully added!");
            })
            .catch(function(error) {
                console.error("Error writing document: ", error);
            });

            categoriesIds.forEach( el => {
                const cid = firestore.collection('category_books').doc().id;
                firestore.collection('category_books').doc(cid).set({
                    category_id: el,
                    book_id: bookId
                })
                    .then(function() {
                        console.log("Category-books successfully added!");
                    })
                    .catch(function(error) {
                        console.error("Error writing document: ", error);
                    });
            });
            setTitle(``);
            setAuthorName(``);
            setAuthorSurname(``);
            setBookFile(undefined);
            setBookImage(undefined);
            setLanguage(``);
            setDescription(``);
        }

        setError(``);
    }


    return (
        <div>
            <h1>Добавить новую книгу - Add New Book</h1>
            <form >
                <input name="author_id" id="author_id" type="text" value={authorId} onChange={(e) => changeItemValue(e, setAuthorId, 'authorId')} hidden/>
                <ul className={css.form_fields}>
                    { error &&
                    <li className={css.form_error}>{error}</li>
                    }
                    <li className={css.form_field}>
                        <label className={css.field_label} htmlFor="title">Название книги (Book title)</label>
                        <input type="text" name="title" className={css.field_input} value={title} onChange={(e) => changeItemValue(e, setTitle, 'title')}/>
                    </li>

                    <li className={css.form_field}>
                        <label className={css.field_label} htmlFor="searchauthor">Поиск автора (Author search)</label>
                        <input type="text" name="search" className={css.field_input} value={searchTerm} onChange={handleChange}/>

                        { searchResults && (searchResults.length > 0) &&
                            <ul className={css.search_results}>
                                {
                                    searchResults.map((s) =>
                                        <li key={s.id}>
                                            <a onClick={(e) => onChooseAuthor(e, s)} href="#">{s.surname}</a>
                                        </li>
                                    )
                                }
                            </ul>
                        }
                    </li>
                    <li className={css.form_field}>
                        <label className={css.field_label} htmlFor="authorName">Имя автора (Author name)</label>
                        <input type="text" name="authorName" className={css.field_input} value={authorName} onChange={(e) => changeItemValue(e, setAuthorName, 'authorName')}/>
                    </li>
                    <li className={css.form_field}>
                        <label className={css.field_label} htmlFor="authorSurname">Фамилия автора (Author surname)</label>
                        <input type="text" name="authorSurname" className={css.field_input} value={authorSurname} onChange={(e) => changeItemValue(e, setAuthorSurname, 'authorSurname')}/>
                    </li>
                    <li className={css.form_field}>
                        <label className={css.field_label} htmlFor="bookImage">Загрузите обложку книги (Image)</label>
                        <input type="file" name="bookImage" className={css.field_input} onChange={handleImageFile}/>
                    </li>
                    <li className={css.form_field}>
                        <label className={css.field_label} htmlFor="bookFile">Загрузите файл книги (File)</label>
                        <input type="file" name="bookFile" className={css.field_input} accept=".pdf" onChange={handleBookFile}/>
                    </li>
                    <li className={css.form_field}>
                        <label className={css.field_label} htmlFor="language">Язык (Language)</label>
                        <select name="language" id="language" value={language} onChange={(e) => changeItemValue(e, setLanguage, 'language')}>
                            <option value="1">RU</option>
                            <option value="2">EN</option>
                        </select>
                    </li>
                    <li className={css.form_field}>
                        <label className={css.field_label} htmlFor="description">Описание книги (Description)</label>
                        <textarea name="description" id="description" className={css.field_input} onChange={(e) => changeItemValue(e, setDescription, 'description')} value={description}></textarea>
                    </li>
                    <li className={css.form_field}>
                        <div><label className={css.field_label}>Категория (Category)</label></div>
                        {categories.map((cat) =>
                            <div className={css.form_field__checkbox} key={cat.id}>
                                <input className={css.field_input__checkbox} name={"categoryId"} id={`categoryId-${cat.id}`} type={"checkbox"} value={cat.id} onChange={onCategoryChange}/>
                                <label className={css.field_label} htmlFor="categoryId">{cat.title}</label>
                            </div>
                        )}

                    </li>
                    <li>
                        <button className={css.btn} type="submit" onClick={onBookAdd}>Добавить (Add book)</button>
                    </li>
                </ul>
            </form>
        </div>
    )
}
export default AddBook;
