import React from "react";
import css from "./Friend.module.scss";

const Friend = (props) => {

    return(
        <li><a href="/" className={css.friend_link}>{`${props.name} ${props.surname}`}</a></li>
    );
}
export default Friend;
