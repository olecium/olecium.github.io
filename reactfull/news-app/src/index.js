import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import About from './About.jsx';
import Articles from './Articles.jsx';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route path='/' component={App} /> /*check what happens if you put 'exact'*/
        </Switch>
    </BrowserRouter>, 
    document.getElementById('root')
);

registerServiceWorker();
