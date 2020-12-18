import {IMenuItem} from "../components/common/interfaces/IMenuItem";

export interface IHeaderState {
    usermenu: IMenuItem[];
    mainmenu: IMenuItem[];
}
const initialState: IHeaderState = {
    usermenu: [
        {id: 1, title: "Избранное", link: "/favourite"},
        {id: 2, title: "Профиль", link: "/profile"},
        {id: 3, title: "Добавить книгу", link: "/add-book"}
    ],
    mainmenu: [
        {id: 1, title: "Главная", link: "/"},
        {id: 2, title: "Книги", link: "/books"},
        {id: 3, title: "Авторы", link: "/authors"}
    ]
}


const headerReducer = (state = initialState, action: any) => {
    return state;
}
export default headerReducer;

