import React, {Component} from 'react';
import './App.scss';
import MenuContainer from "./components/MainContainer/MenuContainer/MenuContainer";
import { BrowserRouter}  from "react-router-dom";
import Content from "./components/Content/Content";
import { connect } from "react-redux";
import { initApp } from "./redux/app-reducer";
import Preloader from "./components/common/Preloader/Preloader";


class App extends Component {
    componentDidMount() {
        this.props.initApp();
    }

    render() {
        if (!this.props.init) {
            return <Preloader/>
        }
        return (
            <BrowserRouter>
                <div className="container">
                    <MenuContainer/>
                    <Content/>
                </div>
            </BrowserRouter>
        );
    }
}

const mapStateToProps = (state) => ({
    init: state.app.init
});
export default connect(mapStateToProps,{ initApp })(App);
