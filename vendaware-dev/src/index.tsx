import React from 'react';
import ReactDOM from 'react-dom';

import {
    BrowserRouter as Router,
    Route,
    Switch,
    RouteComponentProps
} from 'react-router-dom';
import { StaticContext } from 'react-router';

import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';

import { CssBaseline } from './3rd-party-ui/material-ui/initialise';

import { AuthProvider } from 'Login/hooks/useAuth';

import { homeRoute, adminRoute, dashboardMachineViewRoute } from 'Common/constants/routes';

import Wrapper from 'Common/components/Wrapper';

import Login from 'Login/components/Login';
import {NewLogin} from 'Login/components/NewLogin';

import NotFound from 'Common/components/NotFound';

import { ProtectedRoute } from 'Login/components/ProtectedRoute';
import { Dashboard } from 'App/components/Dashboard';

//  Useful utility...
//  Install local web server
//  npm install -g local-web-server
//  Build your SPA
//  use web server to serve your SPA
//  cd to 'build' directory
//  ws --spa index.html
//  This will show a number of IPs and Ports that your SPA is running on

//  Useful info Material UI
//	https://material-ui.com/getting-started/usage/#quick-start
//	https://material-ui.com/getting-started/templates/
//	https://material-ui.com/getting-started/supported-components/
//	https://material-ui.com/components/typography/
//	https://material-ui.com/guides/interoperability/#styled-components
//	https://material-ui.com/guides/composition/#routing-libraries

//  Useful info React-JSS which is bundled with Material UI - Styling etc.
//	https://cssinjs.org/react-jss/?v=v10.5.0

//  Useful info Replacing Redux with React hooks
//  https://medium.com/strands-tech-corner/react-state-management-without-redux-d39c7087039d
//  https://github.com/facebook/react/issues/15156

//  Useful info Firebase and React hooks
//  https://benmcmahen.com/using-firebase-with-react-hooks/
//  https://github.com/CSFrequency/react-firebase-hooks

// const RenderLogin = (props: RouteComponentProps<any, StaticContext, any>): JSX.Element => {
//     return (
//         <Login
//             {...props}
//             adminRoute={adminRoute} dashboardRoute={dashboardMachineViewRoute}
//         />
//     );
// };
const RenderLogin = (props: RouteComponentProps<any, StaticContext, any>): JSX.Element => {
	return (
			<NewLogin	/>
	);
};

ReactDOM.render(
    <React.StrictMode>
        <React.Fragment>
            <CssBaseline />
            <Wrapper>
                <AuthProvider>
                    <Router>
                        <Switch>
                            <Route
                                exact={true}
                                path={homeRoute}
                                render={RenderLogin}
                            />

                            <ProtectedRoute
                                authenticationPath={homeRoute}
                                path={dashboardMachineViewRoute}
                                component={Dashboard}
                            />

                            <Route component={NotFound} />
                        </Switch>
                    </Router>
                </AuthProvider>
            </Wrapper>
        </React.Fragment>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
