import {IHeaderState} from "./header-reducer";
import {IMenuItem} from "../components/common/interfaces/IMenuItem";

export const getUserMenu = (state: IHeaderState): IMenuItem[] => {
    return state.usermenu;
}
export const getMainMenu = (state: IHeaderState): IMenuItem[] => {
    return state.mainmenu;
}
