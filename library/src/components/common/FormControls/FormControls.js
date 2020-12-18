import React from "react";
import css from "./FormControls.module.scss";
import {Field} from "redux-form";

export const Input = ({input, meta, ...props}) => {
    const hasError = meta.touched && meta.error;

    return (
        <div className={`${css.form_control} ${hasError && css.error}`}>
            <input {...input} {...props} />
            {hasError && <p>{meta.error}</p>}
        </div>
    )
}
export const Textarea = ({input, meta, ...props}) => {
    const hasError = meta.touched && meta.error;

    return (
        <div className={`${css.form_control} ${hasError && css.error}`}>
            <textarea {...input} {...props} cols="30" rows="10">{props.value}</textarea>
            {hasError && <p>{meta.error}</p>}
        </div>
    )
}
export const CreateField = (placeholder, name, cssClass, validators, component, props) => (
    <input placeholder={placeholder}
               className={cssClass}
               name={name}
               id={name}
               component={component}
               validate={validators}
               {...props}
    />
);

export const CreateFieldWithLabel = (label, name, component, validators = undefined, props = {}, labelPosition = null) => {
    let classNames = '';
    switch (labelPosition) {
        case 'LEFT':
            classNames = `${css.labelLeft}`;
            break;
        case 'RIGHT':
            classNames = `${css.labelRight}`;
            break;
        default:
            classNames = '';
    }
    //let validate = (validators)? `validate=${validators}` :'';
    return (
        <li className={`${css.formControl} ${classNames}`}>
            <label className={css.formControl__label} htmlFor={name}>{label}</label>
            <input name={name}
                   id={name}
                   component={component}
                   validate={validators}
                   {...props} />
        </li>
    );
}
