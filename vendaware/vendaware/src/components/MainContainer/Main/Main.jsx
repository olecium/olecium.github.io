import React from "react";
import css from "./Main.module.scss";
import Content from "../../Content/Content";
import MenuContainer from "../MenuContainer/MenuContainer";

const Main = () => {
    return (
        <div className={css.app_wrapper}>
            <main className={css.app_main}>
                <MenuContainer />
                <Content/>
            </main>
        </div>
    );
};

export default Main;
