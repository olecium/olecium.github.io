import React from "react";
import css from "./Header.module.scss";
import Menu from "./Menu/Menu";
import UserMenu from "./UserMenu/UserMenu";
import Search from "../Search/Search";
import {IMenuItem} from "../common/interfaces/IMenuItem";
import {useAuth} from "../Login/hooks/useAuth";
import LogoutButton from "../Login/LogoutButton";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";

const Header: React.FC = (): React.ReactElement => {

    const [mainmenu, setMainMenu] = React.useState<IMenuItem[]>([]);

    React.useEffect(() => {
        const getMainMenu = async (): Promise<void> => {

            const mmenu: IMenuItem[] = [
                {id: 1, title: "Главная", link: "/"},
                {id: 2, title: "Книги", link: "/books"},
                {id: 3, title: "Авторы", link: "/authors"}
            ];

            setMainMenu(mmenu);
        }
        getMainMenu();
    }, []);

    const auth = useAuth();

    return (
        <header className={css.header}>
            <LanguageSwitcher />
            {  auth.user &&
                <div>
                    <Menu mainmenu={mainmenu}/>
                    <UserMenu />
                    <Search />
                    <LogoutButton />
                </div>
            }
        </header>
    )
}
export default Header;
