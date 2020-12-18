import React, {Component} from 'react';
import './App.scss';
import {BrowserRouter} from "react-router-dom";
import {connect} from "react-redux";
import {initApp} from "./redux/app-reducer";
import Header from "./components/Header/Header";
import Content from "./components/Content/Content";

class App extends Component {
  componentDidMount() {
    this.props.initApp();
  }

  render() {
    return (
    <BrowserRouter>
      <div className="container">
        <Header/>
        <Content/>
      </div>
    </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => ({
  init: state.app.init
});

export default connect(mapStateToProps, {initApp})(App);
