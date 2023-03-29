
import {IBook} from "../common/interfaces/IBook";
import React from "react";
import css from "./Book.module.scss";
import {NavLink} from "react-router-dom";
import {Draggable} from "react-beautiful-dnd";
import moveIcon from './../../images/icon_move.png';
import heartIcon from './../../images/icon_heart.png';
import heartIconActive from './../../images/icon_heart_active.png';

export interface IBookProps extends IBook {
    authorName: string;
    langTitle: string;
    fav: boolean;
}
export interface IBookHandlers {
    deleteBook?: (id: string) => void;
    addToFavourite?: (id: string, fav: boolean) => void;
    index: number
}

export const Book: React.FC<IBookProps & IBookHandlers> = (props): React.ReactElement => {
    const deleteBook = () => {
        if(props.deleteBook) {
            props.deleteBook(props.id);
        }
    }
    const addToFavourite = () => {
        if(props.addToFavourite) {
            props.addToFavourite(props.id, props.fav);
        }
    }

    return (
        <Draggable draggableId={props.id} index={props.index}>
            {provided => (
                <li  {...provided.draggableProps}

                     ref={provided.innerRef}
                     className={css.books__item}>
                    <div className={css.book}>
                        {props.fav ?
                            <button onClick={addToFavourite} className={css.book__favourite_icon} title="Удалить из избранного"><img src={heartIconActive} width="25" alt=""/></button>
                            :
                            <button onClick={addToFavourite} className={css.book__favourite_icon} title="Добавить в избранное"><img src={heartIcon} width="25" alt=""/></button>
                        }

                        <span className={css.book__move_icon} {...provided.dragHandleProps} title="Переместить"><img src={moveIcon} width="30" alt=""/></span>

                        <p>
                            <img src={props.image} width="150" alt=""/>
                        </p>
                        <p>{props.title}</p>
                        <p>{props.authorName}</p>
                        <p>{props.description}</p>
                        <p>{props.langTitle}</p>
                        <p><a className={css.book__link} href={props.file} target="_blank"
                              rel="noopener noreferrer">Read</a></p>
                        <p>
                            <button onClick={deleteBook}>Delete</button> <NavLink to={`/add-edit-book?id=${props.id}`}>Edit</NavLink>
                        </p>
                    </div>
                </li>
            )}
        </Draggable>
    );
}
