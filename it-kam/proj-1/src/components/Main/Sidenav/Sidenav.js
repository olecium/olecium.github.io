import React from "react";
import {NavLink} from "react-router-dom";
import css from './Sidenav.module.scss';

function Sidenav (props) {

    let navLinks = props.stateSidebar.nav.map( (el) => {
        return(<li><NavLink className={css.app_sidenav__link} activeClassName={css.app_sidenav__link_active} to={el.link}>{el.title}</NavLink></li>);
    });
    return (
        <nav className={css.app_sidenav}>
            <ul className={css.app_sidenav__list}>
                {navLinks}
            </ul>
        </nav>
    );
}
export default Sidenav;
