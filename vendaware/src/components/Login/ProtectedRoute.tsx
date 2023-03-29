import { useAuth } from './hooks/useAuth';
import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router';

export interface IProtectedRouteParentProps extends RouteProps {
    authenticationPath: string;
}

type IProps = IProtectedRouteParentProps;

export const ProtectedRoute: React.FC<IProps> = ({ authenticationPath, ...rest }): React.ReactElement => {
    const auth = useAuth();
    const redirectPath: string | undefined = auth?.user ? undefined : authenticationPath;
    if (redirectPath !== undefined) {
        const RenderComponent = () => (<Redirect to={{ pathname: redirectPath }} />);
        return <Route {...rest} component={RenderComponent} render={undefined} />;
    } else {
        return <Route {...rest} />;
    }
};
