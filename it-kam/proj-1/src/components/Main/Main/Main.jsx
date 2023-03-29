import React from "react";
import Content from "../Content/Content";
import css from "./Main.module.scss";
import SidebarContainer from "../Sidebar/SidebarContainer";

function Main(props) {
    return(
        <div className={css.app_wrapper}>
            <main className={css.app_main}>
                <SidebarContainer />
                <Content/>
            </main>
        </div>
    );
}

export default Main;
