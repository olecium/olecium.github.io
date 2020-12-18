import React from "react";
import css from "./UserMenu.module.scss";
import {NavLink} from "react-router-dom";
import {useAuth} from "../../Login/hooks/useAuth";
import {IMenuItem} from "../../common/interfaces/IMenuItem";


const UserMenu:React.FC = ():React.ReactElement => {

    const [usermenu, setUserMenu] = React.useState<IMenuItem[]>([]);

    React.useEffect(() => {
        const getUserMenu = async (): Promise<void> => {

            const umenu: IMenuItem[] = [
                {id: 1, title: "Избранное", link: "/favourite"},
                {id: 2, title: "Профиль", link: "/profile"},
                {id: 3, title: "Добавить книгу", link: "/add-book"}
            ];

            setUserMenu(umenu);
        }
        getUserMenu();
    }, []);

    const auth = useAuth();

    let userMenuLinks = usermenu.map((el) => {
        return (
            <li key={el.id}>
                <NavLink to={el.link} key={el.id} className={css.usermenu__link} activeClassName={css.usermenu__link_active}>
                    {el.title}
                </NavLink>
            </li>)
     });

    return (
            <div>
                <span>{ auth.user ? "Welcome" : `` }</span>
                <nav className={css.usermenu}>
                    <ul className={css.usermenu__list}>
                        {userMenuLinks}
                    </ul>
                </nav>
            </div>
        );
}
export default UserMenu;
