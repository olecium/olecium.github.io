import React from 'react';

import { Snackbar, SnackbarCloseReason } from '3rd-party-ui/material-ui/components';
import { MuiAlert, AlertProps, AlertColor } from '3rd-party-ui/material-ui/lab';

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

interface INotificationProps {
    show: boolean;
    message: string;
    severity: AlertColor;
    close: () => void;
}

const Notification: React.FC<INotificationProps> = ({ show, message, severity, close }): React.ReactElement => {

    const onClose = (_e: React.SyntheticEvent<any>, reason: SnackbarCloseReason): void => {
        if (reason === "timeout") {
            close();
        }
    }

    return (
        <Snackbar
            key={`Snackbar__${message}__${severity}`}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            open={show}
            autoHideDuration={6000}
            onClose={onClose}
        >
            <Alert onClose={close} severity={severity}>
                {message}
            </Alert>
        </Snackbar>
    );
}

export default Notification;