import React from "react";
import {NavLink} from "react-router-dom";
import css from './NavMain.module.scss';

const NavMain = (props) => {

    return(
        <nav>
            <ul className={css.nav_main}>
                {
                    props.isAuth
                    ?   <>
                            <li><button onClick={props.userLogout}>Logout</button></li>
                            <li><NavLink className={css.nav_main__link} to="/settings">Settings</NavLink></li>
                            <li><span className={css.nav_main__welcome}>Hello, {props.userId} {props.login}</span><NavLink className={css.nav_main__link} activeClassName={css.nav_main__link_active} to="/profile">Profile</NavLink></li>
                        </>
                    :   <li><NavLink className={css.nav_main__link} to="/login">Login</NavLink></li>
                }
            </ul>
        </nav>
    );
}
export default NavMain;
