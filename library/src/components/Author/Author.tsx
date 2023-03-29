
import {IAuthor} from "../common/interfaces/IAuthor";
import React from "react";
import {NavLink} from "react-router-dom";

export interface IAuthorProps extends IAuthor {
}
export interface IAuthorHandlers {
    deleteAuthor?: (id: string) => void;
}

export const Author: React.FC<IAuthorProps & IAuthorHandlers> = (props): React.ReactElement => {
   const deleteAuthor = () => {
        if(props.deleteAuthor) {
            props.deleteAuthor(props.id);
        }
    }
    /* const addToFavourite = () => {
        if(props.addToFavourite) {
            props.addToFavourite(props.id, props.fav);
        }
    }*/

    return (
       
                <li >
                    <div>                        
                        <p>{props.surname} {props.name}</p>
                        <p>{props.description}</p>
                        <p>
                            <button onClick={deleteAuthor}>Delete</button> <NavLink to={`/add-edit-author?id=${props.id}`}>Edit</NavLink>
                        </p>
                    </div>
                </li>
    );
}
