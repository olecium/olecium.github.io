import React from "react";
import { Field } from "redux-form";
import {required, maxLengthCreator} from "./../../../utils/validators/validators";
import { Textarea } from "../../common/FormControls/FormControls";

const maxLength10 = maxLengthCreator(10);

const AddPostForm = (props) => {    

    return (
        <form onSubmit={props.handleSubmit}>
            <Field name={"userpost"} component={Textarea} placeholder={"Post message"} validate={[required, maxLength10]} />            
            <button type="submit">Send</button>
        </form>
    )
}
export default AddPostForm;