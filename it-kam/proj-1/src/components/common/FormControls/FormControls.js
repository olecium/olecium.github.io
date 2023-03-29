import React from "react";
import css from "./FormControls.module.scss";
import {required} from "../../../utils/validators/validators";
import {Field} from "redux-form";

export const Textarea = ({input, meta, ...props}) => {
    const hasError = meta.touched && meta.error;
    return(
        <div className={`${css.form_control} ${hasError && css.error}`}>
            <textarea {...input} {...props}/>
            { hasError && <p>{meta.error}</p> }
        </div>
    )
}
export const Input = ({input, meta, ...props}) => {
    const hasError = meta.touched && meta.error;
    return(
        <div className={`${css.form_control} ${hasError && css.error}`}>
            <input {...input} {...props}/>
            { hasError && <p>{meta.error}</p> }
        </div>
    )
}

export const CreateFieldWithLabel = (labelName, placeholder, name, type,  cssClass, validators, component) => (
    <li className={css.login_item}>
        <label className={css.login_label} htmlFor="password">Password</label>
        <Field placeholder={placeholder}
               className={cssClass}
               name={name}
               type={type}
               component={component}
               validate={validators} />
    </li>
);
