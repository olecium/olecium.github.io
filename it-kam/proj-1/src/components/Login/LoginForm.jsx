import React from "react";
import { Field } from "redux-form";
import {CreateField, Input} from "../common/FormControls/FormControls";
import { required } from "../../utils/validators/validators";
import css from "./Login.module.scss";

const LoginForm = ({handleSubmit, error}) => {
    return (
        <form onSubmit={handleSubmit}>
            <ul className={css.login_items}>
                { error &&
                    <li className={css.form_error}>{error}</li>
                }
                <li className={css.login_item}>
                    <label className={css.login_label} htmlFor="login">Login</label>
                    {CreateField('', "login", "text" ,`${css.login_input}`, [required], Input)}
                {/*<Field className={css.login_input} name={"login"} component={Input} validate={[required]} />*/}
                </li>
                <li className={css.login_item}>
                    <label className={css.login_label} htmlFor="password">Password</label>
                    {CreateField('', "password", "password",`${css.login_input}`, [required], Input)}
                    {/*<Field className={css.login_input} name={"password"} type={"password"} component={Input} validate={[required]} />*/}
                </li>
                <li className={css.login_item__checkbox}>
                    <Field className={css.login_input__checkbox} name={"rememberMe"} id={"rememberMe"} component={Input} type={"checkbox"} />
                    <label className={css.login_label} htmlFor="rememberMe">Remember me</label>
                </li>
                <li>
                    <button className={css.btn} type="submit">Log in</button>
                </li>
            </ul>
        </form>
    )
}
export default LoginForm;
