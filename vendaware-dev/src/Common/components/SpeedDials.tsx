import React from 'react';

import { createStyles, makeStyles, Theme, MenuIcon } from '3rd-party-ui/material-ui/components';
import { SpeedDial, SpeedDialAction } from '3rd-party-ui/material-ui/lab';
import { ISpeedDialAction } from 'Common/interfaces/ISpeedDialAction';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            height: 0,
            flexGrow: 1,
            display: `inline-flex`,
            marginBottom: theme.spacing(3),
        },
        speedDial: {
            position: `fixed`,
            top: theme.spacing(8),
            left: theme.spacing(0),
            "& svg": {
                display: `block`
            },
        },
    }),
);

interface ISpeedDialsProps {
    actions: ReadonlyArray<ISpeedDialAction>;
}

const SpeedDials: React.FC<ISpeedDialsProps> = ({ actions }): React.ReactElement => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    
    const handleClose = () => {
        setOpen(false);
    };
    const handleOpen = () => {
        setOpen(true);
    };

    return (
        <div className={classes.root}>
            <SpeedDial
                ariaLabel="Menu"
                className={classes.speedDial}
                hidden={false}
                icon={<MenuIcon />}
                onClose={handleClose}
                onOpen={handleOpen}
                open={open}
                direction={'down'}
                FabProps={{
                    color: 'primary',
                    size: 'medium',
                }}
            >
                {actions.map((action) => (
                    <SpeedDialAction
                        key={action.id}
                        icon={action.icon}
                        tooltipTitle={action.name}
                        onClick={handleClose}
                        FabProps={{
                            size: 'medium',
                        }}
                    />
                ))}
            </SpeedDial>
        </div>
    );
};

export default SpeedDials;