import LogoutButton from "components/Login/LogoutButton";
import React from "react";
import { NavLink } from 'react-router-dom';
import css from './Menu.module.scss';

const Menu: React.FC = (): React.ReactElement => {
    return(
        <nav className={css.menu}>     
            <ul>                   
                <li>
                    <NavLink to="/admin/users">Users</NavLink>
                </li>
                <li>
                    <LogoutButton/>
                </li>
            </ul>       
        </nav>
    );
}

export default Menu;