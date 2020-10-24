import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import store from "./redux/redux-store";
import {Provider} from "react-redux";
import {Auth0Provider} from "@auth0/auth0-react";

const init = () => {
    ReactDOM.render(
        <Auth0Provider
            domain="wendaware-sandbox.eu.auth0.com"
            clientId="ATow0c1ePl1GMLx07iNuiL0y0tYaAYhA"
            redirectUri={window.location.origin}
        >
            <Provider store={store}>
                <App/>
            </Provider>
        </Auth0Provider>,
        document.getElementById('root')
    );
};
init();

store.subscribe(() => {
    init();
});


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
