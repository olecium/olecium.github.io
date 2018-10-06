import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './Home';
import Products from './Products';
import Product from './Product';
import Cart from './Cart';

class App extends Component {
  render() {
    return (
      <div className="App">


        <BrowserRouter>
          <Switch>
            <Route exact path='/home' component={Home} />
            <Route exact path='/products' component={Products} />
            <Route exact path='/products/:productId' component={Product} />
            <Route exact path='/cart' component={Cart} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
