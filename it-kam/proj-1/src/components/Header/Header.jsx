import React from "react";
import css from "./Header.module.scss";
import NavMainContainer from "./NavMain/NavMainContainer";

function Header () {
    return (
        <header className={css.app_header}>
            <NavMainContainer />
        </header>
    );
}
export default Header;
