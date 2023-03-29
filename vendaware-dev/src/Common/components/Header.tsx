import React from 'react';

import { makeStyles, Theme, NetworkCheckIcon, AppBar, Tooltip } from '3rd-party-ui/material-ui/components';
import { ConnectedProvider, useConnected } from 'Common/hooks/useConnection';
import { useAuth } from 'Login/hooks/useAuth';
import { getUserName } from 'Common/interfaces/IUserInfo';

//import VendawareLogo from 'Images/vendaware.svg';


const useStyles = makeStyles((theme: Theme) => ({
    root: {
        padding: `1px`,
        textAlign: `center`,
        marginLeft: `auto`,
        marginRight: `auto`,
    },
    appBar: {
        backgroundColor: `white`,
        color: `black`,
    },
    header: {
        display: `flex`,
        alignItems: `center`,
        paddingBottom: `2px`,
        marginBottom: `2px`,
        width: `100%`,
    },
    logo: {
        width: `158px`,
        height: `50px`,
        // backgroundImage: `url(${VendawareLogo})`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        marginBottom: `2px`,
    },
    wifi: {
        marginLeft: `12px`,
        marginRight: `auto`,
        marginBottom: `auto`,
        marginTop: `auto`,
        border: `solid 1px rgba(37,183,211,.75)`,
        borderRadius: `36px`,
    },
    title: {
        fontSize: `x-large`,
        fontWeight: `bold`,
        paddingBottom: `auto`,
        paddingTop: `auto`,
        marginLeft: `auto`,
        marginRight: `4px`,
    },
    container: {
        width: `calc(100% - 1px)`,
        height: `98%`,
    }
}));

const fontSizeOk: number = 24;
const fontSizeBad: number = 36;

const connectedStyle: React.CSSProperties = {
    color: `green`,
    fontSize: fontSizeOk,
};
const disconnectedStyle: React.CSSProperties = {
    color: `red`,
    fontSize: fontSizeBad,
};

const tooltipConnected: string = `Connected to network`;
const tooltipDisconnected: string = `Disconnected from network`;

const ConnectionIndicator: React.FC = (): React.ReactElement => {
    const classes = useStyles();
    const { connected } = useConnected();

    const style = connected ? connectedStyle : disconnectedStyle;
    const toolTip= connected ? tooltipConnected : tooltipDisconnected;

    return (
        <Tooltip title={toolTip}>
            <NetworkCheckIcon className={classes.wifi} style={style} />
        </Tooltip>

    );
};

const Header: React.FC = ({ children }): React.ReactElement => {
    const classes = useStyles();
    const { userInfo } = useAuth();
    const title = getUserName(userInfo);
    return (

        <div className={classes.root}>
            <AppBar position={`sticky`} className={classes.appBar}>
                <div className={classes.header}>
                    <div className={classes.logo} />
                    <ConnectedProvider>
                        <ConnectionIndicator />
                    </ConnectedProvider>
                    <div className={classes.title}>{title}</div>
                </div>
            </AppBar>
            <div className={classes.container}>
                {children}
            </div>
        </div>

    );
};

export default Header;