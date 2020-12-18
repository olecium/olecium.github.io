import React from "react";
import {Button, makeStyles, TextField, Theme} from "@material-ui/core";
import { useAuth } from "./hooks/useAuth";

const useStyles = makeStyles((theme: Theme) => ({
    login: {
        marginTop: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '250px'
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        width: '100%'
    },
}));

export const LoginForm:React.FC = ():React.ReactElement => {
    const classes = useStyles();

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
            // @ts-ignore
            const userInfo = await auth.signin(email, password);
            //console.log(JSON.stringify(userInfo));
        }
        catch (err) {
            console.log(err);
        }
    }

    return(
        <div className={classes.login}>
            <TextField
                variant="outlined"
                id="email"
                name="email"
                label="Имэил"
                value={email}
                onChange={onEmailChange}
            />
            <TextField
                variant="outlined"
                id="password"
                name="password"
                type="password"
                label="Пароль"
                value={password}
                onChange={onPasswordChange}
            />
            <Button
                className={classes.submit}
                variant="contained"
                color="primary"
                onClick={onLogin}
            >Войти</Button>
        </div>
    );
}
