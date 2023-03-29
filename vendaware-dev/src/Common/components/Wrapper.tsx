import React from 'react';

import { makeStyles, Theme } from '3rd-party-ui/material-ui/components';

const useStyles = makeStyles((theme: Theme) => ({
    wrapper: {
        overscrollBehaviorY: `contain`,
    },
}));

interface IWrapperProps {

}

const Wrapper: React.FC<IWrapperProps> = ({children}): React.ReactElement => {
    const classes = useStyles();
    return (
        <div className={classes.wrapper}>
            {children}
        </div>
    );
};

export default Wrapper;