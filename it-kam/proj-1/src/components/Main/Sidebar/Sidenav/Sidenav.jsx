import React from "react";
import {NavLink} from "react-router-dom";
import css from './Sidenav.module.scss';

function Sidenav (props) {

    let navLinks = props.navList.map( (el) => {
        return(<li key={el.id}><NavLink className={css.app_sidenav__link} activeClassName={css.app_sidenav__link_active} to={el.link} key={el.id}>{el.title}</NavLink></li>);
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
