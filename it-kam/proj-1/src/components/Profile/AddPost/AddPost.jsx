import React from "react";
import css from "./AddPost.module.scss";
import { reduxForm } from "redux-form";
import AddPostForm from "./AddPostForm";

const AddPostReduxForm = reduxForm({form: 'addPost'})(AddPostForm);

const AddPost = (props) => {

    const onSubmit = (formData) => {        
        props.onPostAdd(formData.userpost);
    }

    return(
        <section className={css.add_post}>
            <h3>Add post</h3>
            <AddPostReduxForm onSubmit={onSubmit}/>
        </section>
    );
}
export default AddPost;