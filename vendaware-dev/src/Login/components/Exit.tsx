import React from 'react';

import {
    useHistory,
} from 'react-router-dom';


import { makeStyles, Theme, Typography, Avatar, Button, Container, ExitToAppIcon } from '3rd-party-ui/material-ui/components';

import { useAuth } from 'Login/hooks/useAuth';
import Notification from 'Common/components/Notification';

const useStyles = makeStyles((theme: Theme) => ({
    paper: {
        marginTop: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    buttons: {
        margin: theme.spacing(3, 0, 1, 0),
    },
    button: {
        marginLeft: theme.spacing(1),
    },
}));

export const Exit: React.FC = (): React.ReactElement => {
    const classes = useStyles();
    const auth = useAuth();
    const history = useHistory();

    const [showError, setShowError] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string>('');

    const onExit = async (): Promise<void> => {
        try {
            await auth?.signout();
        }
        catch (err) {
            setError(err.message);
            setShowError(true);
        }
    };

    const onBack = (): void => {
        history.goBack();
    };

    const onCloseError = (): void => {
        setShowError(false);
    };

    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <ExitToAppIcon />
                </Avatar>
                <Typography component="h1" variant="h6">
                    Sign out
                </Typography>
                <div className={classes.buttons}>
                    <Button
                        onClick={onExit}
                        variant="contained"
                        color="primary"
                        aria-label="exit"
                    >
                        Bye
                    </Button>
                    <Button
                        onClick={onBack}
                        variant="contained"
                        color="secondary"
                        aria-label="back"
                        className={classes.button}
                    >
                        Back
                    </Button>
                </div>
            </div>
            <Notification severity={`error`} close={onCloseError} show={showError} message={error} />
        </Container>
    );
};

