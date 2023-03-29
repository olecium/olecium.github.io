import React from 'react';
import {
    useParams,
    useHistory,
} from 'react-router-dom';

import { makeStyles, Theme, Button, Typography } from '3rd-party-ui/material-ui/components';

import Notification from 'Common/components/Notification';
import { useMachineMetrics } from 'Common/hooks/useMachineMetrics';
import { IMachineMetrics } from 'Common/interfaces/IMachineMetrics';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        flexGrow: 1,
    },
    backButton: {
        marginTop: theme.spacing(3),
    },
}));

export const MachineMetrics: React.FC = (): React.ReactElement => {
    const { machineId } = useParams<{ machineId: string }>();
    const { machineMetrics, machineMetricsError } = useMachineMetrics();
    const [metrics, setMetrics] = React.useState<ReadonlyArray<IMachineMetrics> | undefined>(undefined);
    const [showError, setShowError] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string>(``);
    const classes = useStyles();
    const history = useHistory();

    React.useEffect(() => {
        if (machineMetricsError) {
            setError(machineMetricsError.message);
            setShowError(true);
        }
    }, [machineMetricsError]);

    React.useEffect(() => {
        if (machineMetrics && machineId) {
            setMetrics(machineMetrics[machineId]);
        }
    }, [machineMetrics, machineId]);

    const onCloseError = (): void => {
        setShowError(false);
        setError(``);
    };

    const onBack = (): void => {
        history.goBack();
    };

    const getMetricsDisplay = (): React.ReactElement => {
        if (metrics !== undefined) {
            return (
                <Typography variant="h6" >
                    {`Metrics found for ${machineId}. Display your metrics widgets here`}
                </Typography>
            );
        }

        return (
            <Typography variant="h6" >
                {`No metrics found for ${machineId}`}
            </Typography>
        );
    };

    return (
        <div className={classes.root}>
            {getMetricsDisplay()}
            <Button
                onClick={onBack}
                variant="contained"
                color="secondary"
                aria-label="back"
                className={classes.backButton}
            >
            Back
            </Button>
            <Notification severity={`error`} close={onCloseError} show={showError} message={error} />
        </div>
    );
};
