import React from "react";
import { Field } from "redux-form";
import css from './Messages.module.scss';
import { Textarea } from "../../common/FormControls/FormControls";
import { required, maxLengthCreator } from "../../../utils/validators/validators";

const maxLength10 = maxLengthCreator(10);

const MessageForm = (props) => {

    return(
        <form onSubmit={props.handleSubmit}>
            <Field  name={"message"} component={Textarea} validate={[required, maxLength10]} />
            <button className={css.add_message__button}>Send</button>
        </form>
    )
}
export default MessageForm;