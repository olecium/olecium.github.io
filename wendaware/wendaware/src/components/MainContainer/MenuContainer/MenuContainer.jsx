import {connect} from "react-redux";
import Menu from "./Menu/Menu";
import { userLogout} from "./../../../redux/auth-reducer";

let mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        login: state.auth.login,
        userId: state.auth.userId,
        navList: state.menu.nav
    };
}
const MenuContainer = connect(mapStateToProps, {userLogout})(Menu);
export default MenuContainer;
