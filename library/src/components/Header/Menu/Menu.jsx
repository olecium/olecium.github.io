import React from "react";
import {NavLink} from "react-router-dom";
import css from "./Menu.module.scss";

const Menu = (props) => {
    let menuLinks = props.mainmenu.map((el) => {
        return (
            <li key={el.id} className={css.menu__list_item}>
                <NavLink to={el.link} key={el.id} className={css.menu__link} activeClassName={css.menu__link_active}>
                    {el.title}
                </NavLink>
            </li>)
    });

    return (
        <nav className={css.main_menu}>
            <ul className={css.menu__list}>
                {menuLinks}
            </ul>
        </nav>
    )
}
export default Menu;
