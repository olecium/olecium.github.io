import React from "react";
import css from "./Content.module.scss";
import {Route} from "react-router-dom";
import AboutUs from "../AboutUs/AboutUs";
import News from "../News/News";
import GetInTouch from "../GetInTouch/GetInTouch";
import DashboardContainer from "../Dashboard/DashboardContainer";

const Content = () => {
    return (
        <div className={css.app_content}>
            <Route path="/dashboard" render={() => <DashboardContainer/>} />
            <Route path="/about-us" render={() => <AboutUs/>} />
            <Route path="/news" render={() => <News/>} />
            <Route path="/contact-us" render={() => <GetInTouch/>} />
        </div>
    );
};

export default Content;
