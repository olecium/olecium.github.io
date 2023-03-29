import React from "react";
import css from './Messages.module.scss';
import MessageForm from "./MessageForm";
import { reduxForm } from "redux-form";

const MessageReduxForm = reduxForm({form: 'messageForm'})(MessageForm);

const Messages = (props) => {

    const onSubmit = (formData) => {
        props.addMessage(formData.message);
    }

    return(
        <section className={css.messages_wrapper}>
            <h1 className="primary_title">My Messages</h1>
            <div className={css.messages}>
                <nav className={css.dialogs}>
                    <ul className={css.dialogs_list}>
                        {props.dialogsElements}
                    </ul>
                </nav>
                <div className={css.friend_messages__wrapper}>
                    <div className={css.friend_messages}>
                        {props.messageElements}
                    </div>
                    <div className={css.add_message}>
                        <MessageReduxForm onSubmit={onSubmit}/>
                    </div>
                </div>
            </div>
        </section>
    );
}
export default Messages;
