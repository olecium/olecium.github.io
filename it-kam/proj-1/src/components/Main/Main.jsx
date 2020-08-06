import React from "react";
import Sidenav from '../../Sidenav/Sidenav';
import Content from "../Content/Content";
import s from "./Main.module.scss";

function Main() {
    return(
        <div className={s.app_wrapper}>
            <main className={s.app_main}>
                <section className={s.app_sidebar}>
                    <Sidenav/>
                </section>
                <Content/>
            </main>
        </div>
    );
}

export default Main;
