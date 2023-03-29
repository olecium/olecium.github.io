import React from 'react';

import {
    useHistory,
} from 'react-router-dom';

import { Button, makeStyles, Paper, Theme, Typography } from '3rd-party-ui/material-ui/components';

import { homeRoute } from 'Common/constants/routes';
import { useAuth } from 'Login/hooks/useAuth';
import { isUndefinedOrNull } from 'Common/utils/typeGuards';

const useStyles = makeStyles((theme: Theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: `100%`,
        marginTop: theme.spacing(2),
    },
    paper: {
        backgroundColor: theme.palette.background.default,
        margin: 0,
        height: `calc(100vh - 64px)`,
    },
    button: {
        marginTop: theme.spacing(2),
    },
}));

const NotFound: React.FC = (): React.ReactElement => {
    const classes = useStyles();
    const auth = useAuth();
    const history = useHistory();

    const isLoggedIn = (): boolean => {
        if (auth && !isUndefinedOrNull(auth.user)) {
            return true;
        }

        return false;
    }

    const onBack = (): void => {
        if (isLoggedIn()) {
            history.goBack();
        }
        else {
            history.push(homeRoute);
        }
    };

    return (
        <Paper className={classes.paper}>
            <div className={classes.container}>
                <Typography variant="h4">404</Typography>
                <Typography variant="subtitle1" aria-label="not found">
                    {`Oops! Page not found.`}
                </Typography>
                <Button
                    variant="contained"
                    color="secondary"
                    aria-label="back"
                    onClick={onBack}
                    className={classes.button}
                    fullWidth
                    
                >
                    Back
                </Button>
            </div>
        </Paper>
    );
};

export default NotFound;