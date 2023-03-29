import React from "react";
import css from './MessageTemplate.module.scss';

const MessageTemplate = (props) => {
    let from = props.from === "me" ? "You" : `${props.from}:`;
    let messageClass = props.from === "me" ? css.message_my : css.message_friend;

    return(
        <div className={`${css.message} ${messageClass}`}>
            <small>{props.date}. {from}:</small>
            <p>
                {props.message}
            </p>
        </div>
    );
}
export default MessageTemplate;
