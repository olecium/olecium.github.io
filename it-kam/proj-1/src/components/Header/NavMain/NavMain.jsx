import React from "react";
import {NavLink} from "react-router-dom";
import s from './NavMain.module.scss';

const NavMain = () => {
    return(
        <nav>
            <ul className={s.nav_main}>
                <li><NavLink className={s.nav_main__link} activeClassName={s.nav_main__link_active} to="/profile">Profile</NavLink></li>
                <li><NavLink className={s.nav_main__link} to="/settings">Settings</NavLink></li>
            </ul>
        </nav>
    );
}
export default NavMain;
