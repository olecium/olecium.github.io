import {NavLink} from "react-router-dom";
import s from "./DialogItem.module.scss";
import React from "react";

const DialogItem = (props) => {

    let classList = props.active ? `${s.dialog_link} ${s.dialog_link__active}` : s.dialog_link;

    return(
        <li>
            <NavLink to={`/messages/${props.id}`} className={classList}>
                <div className={s.dialog_pic__wrap}>
                    <img className={s.dialog_pic} src={props.avatar} alt="picture"/>
                </div>
                <span className={s.dialog_names} type="button">{props.name}</span>
            </NavLink>
        </li>
    );
}
export default DialogItem;
