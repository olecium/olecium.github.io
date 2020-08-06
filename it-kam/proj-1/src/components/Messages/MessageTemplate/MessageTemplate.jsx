import React from "react";
import s from './MessageTemplate.module.scss';

const MessageTemplate = (props) => {
    let from = props.from == "me" ? "You" : `${props.from}:`;
    let messageClass = props.from == "me" ? s.message_my : s.message_friend;

    return(
        <div className={`${s.message} ${messageClass}`}>
            <small>{props.date}. {from}:</small>
            <p>
                {props.message}
            </p>
        </div>
    );
}
export default MessageTemplate;
