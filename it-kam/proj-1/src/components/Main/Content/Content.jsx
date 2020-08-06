import React from "react";
import Messages from "../Messages/Messages";
import UserInfo from "../Profile/UserInfo/UserInfo";
import {Route} from "react-router-dom";
import News from "../News/News";
import Music from "../Music/Music";
import Settings from "../Settings/Settings";

function Content() {
    return(
        <section className="app-content">
            <Route path="/profile" component={UserInfo} />
            <Route path="/messages" component={Messages} />
            <Route path="/news" component={News} />
            <Route path="/music" component={Music} />
            <Route path="/settings" component={Settings} />
        </section>
    );
}
export default Content;
