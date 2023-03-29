import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles, Theme, Grid, Button, Card, CardActions, CardContent, Typography, AlarmIcon, HomeIcon, LocationOnIcon, ComputerIcon } from '3rd-party-ui/material-ui/components';

import { dashboardMachineViewRoute } from 'Common/constants/routes';

import Notification from 'Common/components/Notification';
import { useMachineData } from 'Common/hooks/useMachineData';
import { IMachineData } from 'Common/interfaces/IMachineData';
import { format, N_DATE_TIME_STAMP_FORMAT } from 'Common/utils/dateFunctions';

const useStyles = makeStyles((theme: Theme) => ({
    gridRoot: {
        flexGrow: 1,
    },
    machine: {
        '&.MuiCard-root': {
            minWidth: 275,
            minHeight: 266,
            marginBottom: theme.spacing(1),
            borderColor: theme.palette.success.dark,
        },
    },
    machineData: {
        display: `inline-flex`,
        alignItems: `center`,
    },
    machineIcon: {
        marginRight: theme.spacing(2),
        color: theme.palette.success.dark,
    },
}));

const getLocation = (machine: IMachineData): string => {
    return `Latitude ${machine.location.lat} Longitude ${machine.location.long}`;
};

const getInstalled = (machine: IMachineData): string => {
    return `Installed ${format(machine.installed, N_DATE_TIME_STAMP_FORMAT)}`;
};

const getVersion = (machine: IMachineData): string => {
    return `Software Version ${machine.sVersion}`;
};

interface IMachineCard {
    data: IMachineData;
}

const MachineCard: React.FC<IMachineCard> = ({ data }): React.ReactElement => {
    const classes = useStyles();

    return (
        <Card className={classes.machine} variant="outlined">
            <CardContent>
                <Typography variant="h6" >
                    {data.id}
                </Typography>
                <Typography variant="h6" align={`left`}>
                    <div className={classes.machineData}>
                        <HomeIcon className={classes.machineIcon} />
                        {data.address}
                    </div>
                </Typography>
                <Typography variant="h6" align={`left`}>
                    <div className={classes.machineData}>
                        <LocationOnIcon className={classes.machineIcon} />
                        {getLocation(data)}
                    </div>
                </Typography>
                <Typography variant="h6" align={`left`}>
                    <div className={classes.machineData}>
                        <AlarmIcon className={classes.machineIcon} />
                        {getInstalled(data)}
                    </div>
                </Typography>
                <Typography variant="h6" align={`left`}>
                    <div className={classes.machineData}>
                        <ComputerIcon className={classes.machineIcon} />
                        {getVersion(data)}
                    </div>
                </Typography>
            </CardContent>
            <CardActions>
            <Button 
                fullWidth
                variant="contained"
                color="primary"
                component={Link} to={`${dashboardMachineViewRoute}/${data.id}`}
            >SHOW METRICS</Button>
            </CardActions>
        </Card>
    );
};


export const MachineView: React.FC = (): React.ReactElement => {
    const { machineData, machineDataError } = useMachineData();
    const [showError, setShowError] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string>(``);
    const classes = useStyles();

    const onCloseError = (): void => {
        setShowError(false);
        setError(``);
    };

    React.useEffect(() => {
        if (machineDataError) {
            setError(machineDataError.message);
            setShowError(true);
        }

    }, [machineDataError]);

    return (
        <>
            <div className={classes.gridRoot}>
                <Grid
                    container
                    spacing={2}
                    direction="row"
                    justify="flex-start"
                    alignItems="flex-start"
                >
                    {Object.values(machineData).map((m) => <Grid item xs={12} sm={12} md={6} lg={6} xl={6} key={m.uid}><MachineCard key={m.uid} data={m} /></Grid>)}
                </Grid>
            </div>
            <Notification severity={`error`} close={onCloseError} show={showError} message={error} />
        </>
    );
};
