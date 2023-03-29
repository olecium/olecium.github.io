import React from 'react';
import { Typography } from '3rd-party-ui/material-ui/components';

const Copyright: React.FC = (): React.ReactElement => {
    return (
        <Typography component="h1" variant="h6" align="center">
            {`Copyright © n-andgroup ${new Date().getFullYear()}.`}
        </Typography>
    );
};

export default Copyright;