
import React from 'react';
import {
    Route,
    Switch,
    Link,
    useRouteMatch,
} from 'react-router-dom';

import { makeStyles, AppBar, Paper, DashboardIcon, ExitToAppIcon } from '3rd-party-ui/material-ui/components';

import Header from 'Common/components/Header';
import Copyright from 'Common/components/Copyright';
import SpeedDials from 'Common/components/SpeedDials';
import NotFound from 'Common/components/NotFound';
import { Exit } from 'Login/components/Exit';
import { MachineMetrics } from './MachineMetrics';
import { MachineView } from './MachineView';

import { useAuth } from 'Login/hooks/useAuth';
import { ISpeedDialAction } from 'Common/interfaces/ISpeedDialAction';
import { exitDashboardRoute, dashboardMachineViewRoute } from 'Common/constants/routes';
import { MachineDataProvider } from 'Common/hooks/useMachineData';
import { MachineMetricsProvider } from 'Common/hooks/useMachineMetrics';

const useStyles = makeStyles((theme) => ({
    appBar: {
        top: 'auto',
        bottom: 0,
    },
    title: {
        flexGrow: 1,
    },
    paper: {
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(4),
        padding: theme.spacing(1),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
}));

const actionLinkStyle: React.CSSProperties = {
    color: `#303f9f`, textDecoration: `inherit`
}

const actions: ReadonlyArray<ISpeedDialAction> = [
    { icon: <Link to={dashboardMachineViewRoute} style={actionLinkStyle}><DashboardIcon fontSize={`large`} /></Link>, name: 'Dashboard', id: `dashboard` },
    { icon: <Link to={exitDashboardRoute} style={actionLinkStyle}><ExitToAppIcon fontSize={`large`} /></Link>, name: 'Exit', id: `exit` },
];

const DashboardMachineView: React.FC = (): React.ReactElement => {
    const classes = useStyles();
    return (
        <Paper elevation={1} className={classes.paper}>
            <MachineView />
        </Paper>
    );
};

const DashboardMachineMetricsView: React.FC = (): React.ReactElement => {
    const classes = useStyles();
    return (
        <Paper elevation={1} className={classes.paper}>
            <MachineMetrics />
        </Paper>
    );
};

export const Dashboard: React.FC = (): React.ReactElement => {
    const { userInfo } = useAuth();
    const classes = useStyles();
    const { path } = useRouteMatch();
    return (
        <Header>
            <SpeedDials actions={actions} />
            <MachineDataProvider customerId={userInfo?.orgUid}>
                <MachineMetricsProvider customerId={userInfo?.orgUid}>
                    <Switch>
                        <Route path={dashboardMachineViewRoute} exact={true} component={DashboardMachineView} />
                        <Route path={exitDashboardRoute} component={Exit} />
                        <Route path={`${path}/:machineId`}>
                            <DashboardMachineMetricsView />
                        </Route>
                        <Route component={NotFound} />
                    </Switch>
                </MachineMetricsProvider>
            </MachineDataProvider>
            <AppBar position="fixed" className={classes.appBar}>
                <Copyright />
            </AppBar>
        </Header>
    );
};
