import React from "react";
import css from "./Menu.module.scss";
import {NavLink} from "react-router-dom";
import Auth0LoginButton from "../../../Auth0LoginButton/Auth0LoginButton";
import Auth0LogoutButton from "../../../Auth0LogoutButton/Auth0LogoutButton";
import Auth0UserProfile from "../../../Auth0UserProfile/Auth0UserProfile";
import {useAuth0} from "@auth0/auth0-react";

const Menu = (props) => {

    const {isAuthenticated} = useAuth0();

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
                isAuthenticated ?
                    <>
                    <li className={css.menu_item}><NavLink className={css.menu_item__link} activeClassName={css.menu_item__link_active} to="/dashboard">Dashboard</NavLink></li>
                    <Auth0UserProfile />
                    <Auth0LogoutButton/>
                    </>
                    :
                    <Auth0LoginButton />
            }

        </ul>
    );
};

export default Menu;
