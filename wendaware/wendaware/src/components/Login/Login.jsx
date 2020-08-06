import React from "react";
import css from "./Login.module.scss";
import {reduxForm} from "redux-form";
import LoginForm from "./LoginForm";
import { Redirect } from "react-router-dom";

let Login = ({userLogin, isAuth}) => {

    const onSubmit = (formData) => {
        userLogin(formData.login, formData.password, formData.rememberMe);
    }

    if (isAuth) {
        return <Redirect to={"/dashboard"} />
    }

    return (
        <section className={css.login}>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit} />
        </section>
    )
}

export default Login;

let LoginReduxForm = reduxForm({form: 'login'})(LoginForm);
