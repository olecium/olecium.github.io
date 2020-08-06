import React from "react";
import css from "./Menu.module.scss";
import {NavLink} from "react-router-dom";

const Menu = (props) => {

    let navlinks = props.navList.map( (el) => {
        return(
            <li className={css.menu_item} key={el.id}>
                <NavLink className={css.menu_item__link} activeClassName={css.menu_item__link_active} key={el.id} to={el.link}>{el.title}</NavLink>
            </li>);
    })

    return (
        <ul className={css.menu}>
            {navlinks}
            {
                props.isAuth
                    ?   <>
                        <li className={css.menu_item}><NavLink className={css.menu_item__link} activeClassName={css.menu_item__link_active} to="/dashboard">Dashboard</NavLink></li>
                        {/*
                        <li className={css.menu_item}><NavLink className={css.menu_item__link} activeClassName={css.menu_item__link_active} to="/profile">Profile</NavLink></li>
                        */}
                        <li className={css.menu_item}><span className={css.menu__welcome}>Hello, {/*props.userId*/} {props.login}</span></li>
                        <li className={css.menu_item}><button className={css.menu__logout} onClick={props.userLogout}>Logout</button></li>
                    </>
                    :   <li className={css.menu_item}><NavLink className={css.nav_main__link} to="/login">Log In</NavLink></li>
            }
        </ul>
    );
};

export default Menu;
