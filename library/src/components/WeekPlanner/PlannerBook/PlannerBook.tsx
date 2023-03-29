import {IBook} from "../../common/interfaces/IBook";
import React from "react";
import css from "./PlannerBook.module.scss";
import {Draggable} from "react-beautiful-dnd";

export interface IBookProps extends IBook {
    authorName: string;
    langTitle: string;
}
export interface IBookHandlers {
    removePlannedBook: (id: string, day: string) => void;
    index: number,
    day: string
}

const PlannerBook: React.FC<IBookProps & IBookHandlers> = (props): React.ReactElement => {

    const removePlannedBook = () => {
        props.removePlannedBook(props.id, props.day);
    }

    return (
        <Draggable draggableId={props.id} index={props.index}>
            {provided => (
                <li  {...provided.draggableProps}
                     {...provided.dragHandleProps}
                     ref={provided.innerRef}
                     className={css.books__item}>
                    <button className={css.book__remove} onClick={removePlannedBook}>X</button>
                    <div className={css.book}>
                        <p>
                            <img src={props.image} height="150" alt=""/>
                        </p>
                        <p className={css.book__title}>{props.title}</p>
                        <p className={css.book__author}>{props.authorName}</p>
                        <p><a className={css.book__link} href={props.file} target="_blank"
                              rel="noopener noreferrer">Read</a></p>
                    </div>
                </li>
            )}
        </Draggable>
    );
}
export default PlannerBook;
