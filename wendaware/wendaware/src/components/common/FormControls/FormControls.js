import React from "react";
import css from "./FormControls.module.scss";
import { Field } from "redux-form";


export const Textarea = ({input, meta: {touched, error}, ...props}) => {
    const hasError = touched && error;
    const classNames = `${css.formControl__field}
                        ${hasError && css.error}`;
    return(
        <div className={classNames}>
            <textarea {...input} {...props}/>
            { hasError && <p>{error}</p> }
        </div>
    )
}
export const Input = ({input, meta: {touched, error}, ...props}) => {
    const hasError = touched && error;
    const classNames = `${css.formControl__field}
                        ${hasError && css.error}`;
    return(
        <div className={classNames}>
            <input {...input} {...props}/>
            { hasError && <p>{error}</p> }
        </div>
    )
}
export const CreateFieldWithLabel = (label, name, component, validators = undefined, props = {}, labelPosition = null) => {
    let classNames = '';
    switch(labelPosition){
        case 'LEFT': classNames = `${css.labelLeft}`; break;
        case 'RIGHT': classNames = `${css.labelRight}`; break;
        default: classNames = '';
    }
    //let validate = (validators)? `validate=${validators}` :'';
    return(
        <li className={`${css.formControl} ${classNames}`}>
            <label className={css.formControl__label} htmlFor={name}>{label}</label>
            <Field name={name}
                   id={name}
                   component={component}
                   validate={validators}
                   {...props} />
        </li>
    );
}
