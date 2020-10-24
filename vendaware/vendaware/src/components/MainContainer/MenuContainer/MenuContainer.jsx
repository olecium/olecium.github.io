import {connect} from "react-redux";
import Menu from "./Menu/Menu";
//import { userLogout} from "../../../redux/_auth-reducer";

let mapStateToProps = (state) => {
    return {
        /*isAuth: state.auth.isAuth,
        login: state.auth.login,
        userId: state.auth.userId,*/
        navList: state.menu.nav
    };
}
const MenuContainer = connect(mapStateToProps, {})(Menu);
export default MenuContainer;
