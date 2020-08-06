import React from "react";
import css from "./Content.module.scss";
import Dashboard from "../Dashboard/Dashboard";
import {Route} from "react-router-dom";
import AboutUs from "../AboutUs/AboutUs";
import News from "../News/News";
import GetInTouch from "../GetInTouch/GetInTouch";
import LoginContainer from "../Login/LoginContainer";

const Content = () => {
    return (
        <div className={css.app_content}>
            <Route path="/dashboard" render={() => <Dashboard/>} />
            <Route path="/about-us" render={() => <AboutUs/>} />
            <Route path="/news" render={() => <News/>} />
            <Route path="/contact-us" render={() => <GetInTouch/>} />
            <Route path="/login" component={LoginContainer} />
        </div>
    );
};

export default Content;
