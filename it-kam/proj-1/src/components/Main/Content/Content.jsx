import React from "react";
import {Route, Redirect} from "react-router-dom";
import ProfileContainer from "../../Profile/ProfileContainer";
import News from "../../News/News";
import Music from "../../Music/Music";
import Settings from "../../Settings/Settings";
import css from "./Content.module.scss";
import MessagesContainer from "../../Messages/MessagesContainer";
import UsersContainer from "../../Users/UsersContainer";
import LoginContainer from "../../Login/LoginContainer";

const Content = () => {
    return(
        <section className={css.app_content}>
            <Route exact path='/' render={() => <Redirect to={"/profile"}/>}/>
            <Route path="/profile/:userId?" render={() => <ProfileContainer />} />
            <Route path="/messages" render={() => <MessagesContainer />} />
            <Route path="/users" render={() => <UsersContainer />} />
            <Route path="/news" component={News} />
            <Route path="/music" component={Music} />
            <Route path="/settings" component={Settings} />
            <Route path="/login" component={LoginContainer} />
        </section>
    );
}
export default Content;
