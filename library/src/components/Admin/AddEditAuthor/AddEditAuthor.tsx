import React from "react";
import css from "./AddEditAuthor.module.scss";
import {firestore} from "../../../Storage";
import {IAuthor} from "../../common/interfaces/IAuthor";
import {useAuth} from "../../Login/hooks/useAuth";
import {IErrorMap} from "../../common/interfaces/IError";
import {useLocation} from "react-router";
import {IBook} from "../../common/interfaces/IBook";


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
    const [authorId, setAuthorId] = React.useState<string>(``);
    const [authorName, setAuthorName] = React.useState<string>(``);
    const [authorSurname, setAuthorSurname] = React.useState<string>(``);
    const [description, setDescription] = React.useState<string>(``);
    const [searchTerm, setSearchTerm] = React.useState(``);
    const [searchResults, setSearchResults] = React.useState<IAuthor[]>([]);
    const [title, setTitle] = React.useState<string>(``);
    
    const getAuthorData = async (authorId: string): Promise<void> => {
        const doc = await firestore.collection('authors').doc(authorId).get();
        try {
            if (doc.exists) {
                
                const a: IAuthor = doc.data() as IAuthor;
                setAuthorId(a.id);
                setAuthorName(a.name);
                setAuthorSurname(a.surname);
                setDescription(a.description);
            }
            else {
                console.log("No such document!");
            }

        } catch (err) {
            console.log("Error getting document:", err);
        }

    }

    React.useEffect(() => {

        const authorid = query.get("id") || false;

        if (authorid) {
            setQueryId(authorid);
            getAuthorData(authorid);
        }

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

    const setFieldError = (fieldName: string) => {
        setErrors(prevState => ({...prevState, [fieldName]: {field: fieldName, error: `${fieldName}`}}));
    }

    const onAuthorAddEdit = async (e: React.FormEvent): Promise<void> => {
        e.preventDefault();
        setErrors({});

        let hasError: boolean = false;
            if (!authorName) {
                hasError = true;
                setFieldError('Имя автора');
            }
            if (!authorSurname) {
                hasError = true;
                setFieldError('Фамилия автора');
            }

        if (!hasError) {
            setUpload(true);
                
                const authorid = (!queryId)
                    ? firestore.collection('authors').doc().id
                    : queryId;

                await firestore.collection('authors').doc(authorid).set({
                    id: authorid,
                    name: authorName,
                    surname: authorSurname,
                    description: description
                });


                if(!queryId) {
                    setMessage("Автор успешно добавлен!");
                    setTimeout(function(){ setMessage(``); }, 3000);

                    setAuthorId(``);
                    setAuthorName(``);
                    setAuthorSurname(``);
                    setDescription(``);
                } else {
                    await getAuthorData(queryId);
                    setMessage("Автор успешно отредактирован!");
                    setTimeout(function(){ setMessage(``); }, 3000);
                }
                setErrors({});
                setUpload(false);
        }

    }


    return (
        <div>
            {(queryId !== '') ?
                <h1>Редактировать автора - Edit Author </h1>
                :
                <h1>Добавить нового автора - Add New Author </h1>
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
            <form>
                <input name="author_id" id="author_id" type="text" value={authorId} onChange={(e) => changeItemValue(e, setAuthorId, 'authorId')} hidden/>
                <ul className={css.form_fields}>

                    <li className={css.form_field}>
                        <label className={css.field_label} htmlFor="authorName">Имя автора (Author name)</label>
                        <input type="text" name="authorName" className={css.field_input} value={authorName} onChange={(e) => changeItemValue(e, setAuthorName, 'authorName')}/>
                    </li>

                    <li className={css.form_field}>
                        <label className={css.field_label} htmlFor="authorSurname">Фамилия автора (Author surname)</label>
                        <input type="text" name="authorSurname" className={css.field_input} value={authorSurname} onChange={(e) => changeItemValue(e, setAuthorSurname, 'authorSurname')}/>
                    </li>
                    
                    <li className={css.form_field}>
                        <label className={css.field_label} htmlFor="description">Об авторе (Description)</label>
                        <textarea name="description" id="description" className={`${css.field_input} ${css.field_textarea}`} onChange={(e) => changeItemValue(e, setDescription, 'description')} value={description}></textarea>
                    </li>
                    
                    <li className={css.form_buttons}>
                        <button className={css.btn} type="submit" onClick={onAuthorAddEdit}>{ (queryId !== '') ? 'Сохранить изменения' : 'Добавить автора'}</button>
                    </li>
                </ul>
            </form>
            }
        </div>
    )
}
export default AddEditBook;
