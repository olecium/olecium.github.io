import React, {Component} from 'react';
import './App.scss';
import Footer from './components/Footer/Footer';
import {BrowserRouter, withRouter} from "react-router-dom";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main/Main";
import { connect } from "react-redux";
import { initApp } from "./redux/app-reducer";
import Preloader from './components/common/Preloader/Preloader';

class App extends Component {

  componentDidMount() {
    this.props.initApp();
  }

  render() {
    if( !this.props.init ){
      return <Preloader />
    }
    return (
        <BrowserRouter>
          <div className="container">
            <Header/>
            <Main/>
            <Footer/>
          </div>
        </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => ({
  init: state.app.init
});
export default connect(mapStateToProps,{ initApp })(App);
