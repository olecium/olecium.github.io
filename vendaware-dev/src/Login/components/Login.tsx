import React from 'react';
import { Redirect } from 'react-router';

import { makeStyles, Theme, Typography, Avatar, Button, Container, LockOutlinedIcon, TextField, Box } from '3rd-party-ui/material-ui/components';

import Copyright from 'Common/components/Copyright';
//import VendawareLogo from 'Images/vendaware.svg';

import { useAuth } from 'Login/hooks/useAuth';
import { isUndefinedOrNull } from 'Common/utils/typeGuards';
import { IUserInfoType, UserTypeId } from 'Common/interfaces/IUserInfo';
import Notification from 'Common/components/Notification';

const useStyles = makeStyles((theme: Theme) => ({
    paper: {
        marginTop: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    logo: {
        width: `100%`,
        height: `80px`,
        // backgroundImage: `url(${VendawareLogo})`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        marginBottom: `12px`,
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export interface ILoginProps {
    adminRoute: string;
    dashboardRoute: string;
}

const Login: React.FC<ILoginProps> = ({ adminRoute, dashboardRoute }): React.ReactElement => {
    const classes = useStyles();
    const auth = useAuth();

    const [showError, setShowError] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string>('');

    const [userEmail, setUserEmail] = React.useState<string>(``);
    const [userPwd, setUserPwd] = React.useState<string>(``);
    const [userInfo, setUserInfo] = React.useState<IUserInfoType>(undefined);

    const onSignIn = async (): Promise<void> => {
        try {
            setError(``);
            const userInfo = await auth?.signin(userEmail, userPwd);
            setUserInfo(userInfo);
        }
        catch (err) {
            setError(err.message);
            setShowError(true);
        }
    };

    const onCloseError = (): void => {
        setShowError(false);
    };

    const onEmailChanged = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void => {
        const value: string = event.target.value as string;
        setUserEmail(value);
    };

    const onPwdChanged = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void => {
        const value: string = event.target.value as string;
        setUserPwd(value);
    };

    if (!isUndefinedOrNull(userInfo)) {
        const userType: UserTypeId = userInfo.type;

        switch (userType) {
            case UserTypeId.Administrator:
                return <Redirect to={{ pathname: adminRoute }} />;

            case UserTypeId.Dashboard:
                return <Redirect to={{ pathname: dashboardRoute }} />;

        }
    }

    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <div className={classes.logo} />
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form className={classes.form} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={userEmail}
                        onChange={onEmailChanged}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={userPwd}
                        onChange={onPwdChanged}
                    />
                    <Button
                        onClick={onSignIn}
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign In
                    </Button>
                </form>
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
            <Notification severity={`error`} close={onCloseError} show={showError} message={error} />
        </Container>
    );
};

export default Login;