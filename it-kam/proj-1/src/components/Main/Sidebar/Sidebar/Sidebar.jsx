import React from "react";
import css from './Sidebar.module.scss';
import Sidenav from './../Sidenav/Sidenav';
import Friends from "./../Friends/Friends";

function Sidebar (props) {

    return (
        <section className={css.app_sidebar}>
            <Sidenav navList={props.navList}/>
            <Friends friendList={props.friendList} />  
        </section>
    );
}
export default Sidebar;
