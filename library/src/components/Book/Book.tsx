
import {IBook} from "../common/interfaces/IBook";
import React from "react";

export interface IBookProps extends IBook {
    authorName: string;
}

export const Book: React.FC<IBookProps> = (props): React.ReactElement => {

    return(
        <div>
            <p>
                <img src={props.image} width="200" alt=""/>
            </p>
            <p>{props.title}</p>
            <p>{props.authorName}</p>
            <p>{props.description}</p>
            <p>{props.language}</p>
            <p><a href={props.file} target="_blank">Read</a></p>
        </div>
    );
}
