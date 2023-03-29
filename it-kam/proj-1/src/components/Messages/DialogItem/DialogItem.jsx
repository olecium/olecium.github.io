import {NavLink} from "react-router-dom";
import css from "./DialogItem.module.scss";
import React from "react";

const DialogItem = (props) => {

    let classList = props.active ? `${css.dialog_link} ${css.dialog_link__active}` : css.dialog_link;

    return(
        <li>
            <NavLink to={`/messages/${props.id}`} className={classList}>
                <div className={css.dialog_pic__wrap}>
                    <img className={css.dialog_pic} src={props.avatar} alt="picture"/>
                </div>
                <span className={css.dialog_names} type="button">{props.name}</span>
            </NavLink>
        </li>
    );
}
export default DialogItem;
