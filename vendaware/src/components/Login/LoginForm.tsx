import React from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import css from './Login.module.scss';
import logo from 'images/vendaware_logo.png';


export const LoginForm:React.FC = ():React.ReactElement => {
   
    const history = useHistory();
    const auth = useAuth();

    const [email, setEmail] = React.useState<string>(``);
    const [password, setPassword] = React.useState<string>(``);

    const onEmailChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const value: string = event.target.value as string;
        setEmail(value);
    }

    const onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const value: string = event.target.value as string;
        setPassword(value);
    }

    const onLogin = async(): Promise<void> => {
        try{
            const userInfo = await auth.signin(email, password);
            //console.log(userInfo);
            if(userInfo?.role_id === '1'){
                history.push("/admin");  
            } else {
                history.push("/index");
            }
            
        }
        catch (err) {
            console.log(err);
        }
    }

    return(
        <div className={css.login_form}>
            <header>
                <img src={logo} alt="" width="100"/>
            </header>
            <div className={css.form_field}>
                <input
                    className={css.field_input}
                    id="email"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={onEmailChange}
                />
            </div>
            <div className={css.form_field}>
                <input
                    className={css.field_input}
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={onPasswordChange}
                />
            </div>
            <div className={css.form_field}>
                <button className={css.button_primary} onClick={onLogin}>Log in</button>
            </div>
        </div>
    );
}
