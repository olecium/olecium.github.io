import React from "react";
import { Input, CreateFieldWithLabel } from "../common/FormControls/FormControls";
import { required } from "../../utils/validators/validators";
import css from "./Login.module.scss";

const LoginForm = ({handleSubmit, error, captcha}) => {

    return (
        <form onSubmit={handleSubmit}>
            <ul className={css.login_items}>
                { error &&
                <li className={css.form_error}>{error}</li>
                }

                {CreateFieldWithLabel("Login", "login", Input, [required], {type:  "text"})}
                {CreateFieldWithLabel("Password", "password", Input, [required], {type:  "password"})}
                {CreateFieldWithLabel("Remember me", "rememberMe", Input, undefined, {type: "checkbox"}, "RIGHT")}
                {
                    captcha &&
                    <img src={captcha} alt=""/>
                }
                {
                    captcha &&
                    CreateFieldWithLabel("Please enter security symbols", "captcha", Input, [required], {type:  "text"})
                }
                <li>
                    <button className={css.btn} type="submit">Log in</button>
                </li>
            </ul>
        </form>
    )
}
export default LoginForm;
