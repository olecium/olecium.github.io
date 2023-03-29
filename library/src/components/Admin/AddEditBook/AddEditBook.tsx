import React from "react";
import css from "./AddEditBook.module.scss";
import {firestore} from "../../../Storage";
import {IAuthor} from "../../common/interfaces/IAuthor";
import {useAuth} from "../../Login/hooks/useAuth";
import {ICategory} from "../../common/interfaces/ICategory";
import firebase from "firebase";
import {IErrorMap} from "../../common/interfaces/IError";
import {useLocation} from "react-router";
import {IBook} from "../../common/interfaces/IBook";
import {ILanguage} from "../../common/interfaces/ILanguage";


export interface ICategoryProps extends ICategory {
    selected: boolean;
}

export interface ICategoryMap {
    [id: string]: ICategoryProps;
}
export interface IExistingBookCategory {
    docId: string;
    catId: string;
}

export const uploadFileReturnUrl = async (file: File, storagePath: string): Promise<string> => {
    const storageRef = firebase.storage().ref();
    const toStore = storageRef.child(storagePath);
    const snapshot: firebase.storage.UploadTaskSnapshot = await toStore.put(file);
    const url: string = await snapshot.ref.getDownloadURL();
    return url;
}

type SetStringState = (value: (((prevState: string) => string) | string)) => void;

function useQuery() {
    return new URLSearchParams(useLocation().search);
}
const AddEditBook: React.FC = (): React.ReactElement => {

    const {user} = useAuth();
    const query = useQuery();

    const [upload, setUpload] = React.useState<boolean>(false);
    const [queryId, setQueryId] = React.useState<string>(``);
    const [message, setMessage] = React.useState<string>(``);
    const [errors, setErrors] = React.useState<IErrorMap>({});
    const [authors, setAuthors] = React.useState<IAuthor[]>([]);
    const [categories, setCategories] = React.useState<ICategoryMap>({});
    const [authorId, setAuthorId] = React.useState<string>(``);
    const [authorName, setAuthorName] = React.useState<string>(``);
    const [authorSurname, setAuthorSurname] = React.useState<string>(``);
    const [searchTerm, setSearchTerm] = React.useState(``);
    const [searchResults, setSearchResults] = React.useState<IAuthor[]>([]);
    const [title, setTitle] = React.useState<string>(``);
    const [bookImage, setBookImage] = React.useState<File|undefined>(undefined);
    const [bookImageLink, setBookImageLink] = React.useState<string>(``);
    const [bookFile, setBookFile] = React.useState<File|undefined>(undefined);
    const [bookFileLink, setBookFileLink] = React.useState<string>(``);
    const [language, setLanguage] = React.useState<string>(``);
    const [languages, setLanguages] = React.useState<ILanguage[]>([]);
    const [description, setDescription] = React.useState<string>(``);
    const [existingBookCategories, setExistingBookCategories] = React.useState<IExistingBookCategory[]>([]);

    const getBookData = async (bookId: string): Promise<void> => {

        const doc = await firestore.collection("books").doc(bookId).get();
        try {
            if (doc.exists) {
                const b: IBook = doc.data() as IBook;
                setTitle(b.title);
                setDescription(b.description);
                setBookImageLink(b.image);
                setBookFileLink(b.file);
                setAuthorId(b.author_id);

                const authorSnapshot = await firestore.collection('authors').doc(b.author_id).get();
                const a: IAuthor = authorSnapshot.data() as IAuthor;
                setAuthorName(a.name);
                setAuthorSurname(a.surname);

                const languageSnapshot = await firestore.collection('languages').doc(b.language).get();
                const l: ILanguage = languageSnapshot.data() as ILanguage;
                setLanguage(l.id);

                const categoriesSnapshot = await firestore.collection('categories').get();
                const bookCategsSnapshot = await firestore.collection('category_books').get();

                const existingBookCategories = bookCategsSnapshot.docs
                    .map(x => ({
                        id: x.id, data: x.data()
                    }))
                    .filter(x => {
                        return (x.data.book_id === bookId) ? x : false;
                        /*
                        if(x.data.book_id === bookId)
                            return x;*/
                    })
                    .map(x => ({
                        docId: x.id,
                        catId: x.data.category_id
                    }));
                setExistingBookCategories(existingBookCategories);

                const bc = categoriesSnapshot.docs
                    .map(c => c.data())
                    .map(c => ({
                        id: c.id,
                        title: c.title,
                        selected: !!existingBookCategories.find(x => x.catId === c.id)
                    }));

                const categoriesMap: ICategoryMap = {};
                for(const c of bc){
                    categoriesMap[c.id] = c;
                }

                setCategories(categoriesMap);
            }
            else {
                console.log("No such document!");
            }

        } catch (err) {
            console.log("Error getting document:", err);
        }

    }

    React.useEffect(() => {

        const bid = query.get("id") || false;

        if (bid) {
            setQueryId(bid);
            getBookData(bid);
        }

        const getAuthors = async (): Promise<void> => {
            try {
                if(user === undefined || user === null) return;
                const authorSnapshot = await firestore.collection('authors').get();

                const auths: IAuthor[] = [];

                authorSnapshot.docs.forEach((doc) => {
                    const d: IAuthor = doc.data() as IAuthor;
                    auths.push(d);
                });

                setAuthors(auths);
            }
            catch (err) {
                console.log(err);
            }
        }
        getAuthors();
    }, [user]);


    React.useEffect(() => {

        const getLanguages = async (): Promise<void> => {
            try {
                if(user === undefined || user === null) return;
                const langSnapshot = await firestore.collection('languages').get();
                const langs: ILanguage[] = [];
                langSnapshot.docs.forEach((doc) => {
                    const l = doc.data();

                    const a: ILanguage = {
                        id: l.id,
                        title: l.title
                    }
                    if(l.default) {
                        setLanguage(l.id);
                    }
                    langs.push(a);
                });

                setLanguages(langs);
            }
            catch (err) {
                console.log(err);
            }
        }
        getLanguages();
    }, [user]);

    const getCategories = async (): Promise<void> => {
        try {
            if(user === undefined || user === null) return;
            const categoriesSnapshot = await firestore.collection('categories').get();

            const categs: ICategoryProps[] = [];

            categoriesSnapshot.docs.forEach((doc) => {
                const c = doc.data();

                const a: ICategoryProps = {
                    id: c.id,
                    title: c.title,
                    selected: false
                }
                categs.push(a);
            });
            const categoriesMap: ICategoryMap = {};
            for(const c of categs){
                categoriesMap[c.id] = c;
            }
            console.log(categoriesMap);
            setCategories(categoriesMap);
        }
        catch (err) {
            console.log(err);
        }
    }

    React.useEffect(() => {

        getCategories();
    }, [user]);

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
    }, [searchTerm, authors]);

    const changeItemValue = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>, setState: SetStringState, fieldName: string): void => {

        const v = e.target.value as string;
        setState(v);
    }

    const onAuthorSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    }

    const onCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const catId = e.target.value;

        const original = categories[catId];
        const update: ICategoryProps = {
            id: catId,
            title: original.title,
            selected: !original.selected
        };
        setCategories(prevState => ({...prevState, [catId]: update}));

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

    const setFieldError = (fieldName: string) => {
        setErrors(prevState => ({...prevState, [fieldName]: {field: fieldName, error: `${fieldName}`}}));
    }

    const onBookAddEdit = async (e: React.FormEvent): Promise<void> => {
        e.preventDefault();
        setErrors({});

        let hasError: boolean = false;
            if (!title) {
                hasError = true;
                setFieldError('Название книги');
            }
            if (!authorId) {
                hasError = true;
                setFieldError('Автор');
            }
            if (!description) {
                hasError = true;
                setFieldError('Описание');
            }
            if (!bookImage) {
                if(!queryId) {
                    hasError = true;
                    setFieldError('Обложка');
                }
            }
            if (!bookFile) {
                if(!queryId) {
                    hasError = true;
                    setFieldError('Файл книги');
                }
            }

            const categoriesChosen = Object.values(categories)
                .map(x => x.selected)
                .includes(true);

            if(!categoriesChosen) {
                hasError = true;
                setFieldError('Категория');
            }

        if (!hasError) {
                setUpload(true);

                const bookId = (!queryId)
                    ? firestore.collection('books').doc().id
                    : queryId;

                let fileUrl: string = '';
                let imageUrl: string = '';

                if(bookFile) {
                    fileUrl = await uploadFileReturnUrl(bookFile, `books/pdf/${bookId}`);
                } else {
                    if(queryId) {
                        fileUrl = bookFileLink;
                    }
                }

                if(bookImage) {
                    const imageStoragePath: string = `books/covers/${bookId}-cover`;
                    imageUrl = await uploadFileReturnUrl(bookImage, imageStoragePath);
                } else {
                    if(queryId) {
                        imageUrl = bookImageLink;
                    }
                }

                await firestore.collection('books').doc(bookId).set({
                    id: bookId,
                    title: title,
                    author_id: authorId,
                    description: description,
                    image: imageUrl,
                    file: fileUrl,
                    language: language,
                });

                for (const c of Object.values(categories)) {
                    let exists = existingBookCategories
                        .filter(x => (c.id === x.catId))
                        .map(x => x.docId);

                    if (!c.selected) {
                        if (exists.length > 0) {
                            await firestore.collection('category_books').doc(exists[0]).delete();
                        }
                    } else {
                        if (exists.length === 0) {
                            const cid = firestore.collection('category_books').doc().id;
                            await firestore.collection('category_books').doc(cid).set({
                                category_id: c.id,
                                book_id: bookId
                            });
                        }
                    }
                }


                if(!queryId) {
                    setMessage("Книга успешно добавлена!");
                    setTimeout(function(){ setMessage(``); }, 3000);

                    setTitle(``);
                    setAuthorId(``);
                    setAuthorName(``);
                    setAuthorSurname(``);
                    setDescription(``);
                    getCategories();
                } else {
                    await getBookData(queryId);
                    setMessage("Книга успешно отредактирована!");
                    setTimeout(function(){ setMessage(``); }, 3000);
                }
                setBookFile(undefined);
                setBookImage(undefined);
                setErrors({});
                setUpload(false);
        }

    }


    return (
        <div>
            {(queryId !== '') ?
                <h1>Редактировать книгу - Edit Book </h1>
                :
                <h1>Добавить новую книгу - Add New Book </h1>
            }
            { (Object.keys(errors).length > 0)  &&
                <div className={css.form_errors}>
                    <p>Обязательные поля: </p>
                    <ul>
                        {
                            Object.values(errors).map((x, i) =>
                                <li className={css.form_errors__error} key={i}>{x.error}</li>
                            )
                        }
                    </ul>
                </div>
            }

            {message &&
                <div className={css.message}>
                    <p>{message}</p>
                </div>
            }
            {
                upload ?
                    <div className={css.loading}>
                        <p>Пожалуйста подождите пока данные загружаются...</p>
                    </div>
            :
            <form >
                <input name="author_id" id="author_id" type="text" value={authorId} onChange={(e) => changeItemValue(e, setAuthorId, 'authorId')} hidden/>
                <ul className={css.form_fields}>

                    <li className={css.form_field}>
                        <label className={css.field_label} htmlFor="title">Название книги (Book title)</label>
                        <input type="text" name="title" className={css.field_input} value={title} onChange={(e) => changeItemValue(e, setTitle, 'title')}/>
                    </li>

                    <li className={`${css.form_field} ${css.author_search}`}>
                        <label className={css.field_label} htmlFor="searchauthor">Поиск автора (Author search)</label>
                        <input type="text" name="search" className={css.field_input} value={searchTerm} onChange={onAuthorSearch}/>

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
                    { authorSurname &&
                    <li className={css.form_field}>
                        <label className={css.field_label} htmlFor="authorName">Имя автора (Author name)</label>
                        <p>{authorName} {authorSurname}</p>
                        {/*
                            <input type="text" name="authorName" className={css.field_input} value={authorName} onChange={(e) => changeItemValue(e, setAuthorName, 'authorName')}/>

                    </li>
                    <li className={css.form_field}>
                        <label className={css.field_label} htmlFor="authorSurname">Фамилия автора (Author surname)</label>
                        <input type="text" name="authorSurname" className={css.field_input} value={authorSurname} onChange={(e) => changeItemValue(e, setAuthorSurname, 'authorSurname')}/>
                        */}</li>
                }
                    <li className={css.form_field}>
                        <label className={css.field_label} htmlFor="bookImage">Загрузите обложку книги (Image)</label>
                        { bookImageLink &&
                            <div className={css.book_image}>
                                <img src={bookImageLink} width="150" alt=""/>
                            </div>
                        }
                        <input type="file" name="bookImage" className={css.field_input} onChange={handleImageFile}/>
                    </li>
                    <li className={css.form_field}>
                        <label className={css.field_label} htmlFor="bookFile">Загрузите файл книги (File)</label>
                        { bookFileLink &&
                            <a className={css.book_link} href={bookFileLink} rel="noopener noreferrer" target="_blank">Посмотреть текущий файл</a>
                        }
                        <input type="file" name="bookFile" className={css.field_input} accept=".pdf" onChange={handleBookFile}/>
                    </li>
                    <li className={css.form_field}>
                        <label className={css.field_label} htmlFor="language">Язык (Language)</label>
                        <select name="language" id="language" value={language} onChange={(e) => changeItemValue(e, setLanguage, 'language')}>
                            {
                                languages.map((l) =>
                                    <option key={l.id} value={l.id}>{l.title}</option>
                                )
                            }
                        </select>
                    </li>
                    <li className={css.form_field}>
                        <label className={css.field_label} htmlFor="description">Описание книги (Description)</label>
                        <textarea name="description" id="description" className={`${css.field_input} ${css.field_textarea}`} onChange={(e) => changeItemValue(e, setDescription, 'description')} value={description}></textarea>
                    </li>
                    <li className={css.form_field}>
                        <div><label className={css.field_label}>Категория (Category)</label></div>
                        {Object.values(categories).map((cat) =>
                            <div className={css.form_field__checkbox} key={cat.id}>
                                <input className={css.field_input__checkbox} name={"categoryId"} id={`categoryId-${cat.id}`} type={"checkbox"} checked={cat.selected} value={cat.id} onChange={onCategoryChange}/>
                                <label className={css.field_label} htmlFor="categoryId">{cat.title}</label>
                            </div>
                        )}

                    </li>
                    <li className={css.form_buttons}>
                        <button className={css.btn} type="submit" onClick={onBookAddEdit}>{ (queryId !== '') ? 'Сохранить изменения' : 'Добавить книгу'}</button>
                    </li>
                </ul>
            </form>
            }
        </div>
    )
}
export default AddEditBook;
