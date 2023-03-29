import { connect } from "react-redux";
import Sidebar from "./Sidebar/Sidebar";

let mapStateToProps = (state) => {
    return {
        navList: state.sidebar.nav,
        friendList: state.sidebar.friendList
    };
}
const SidebarContainer = connect(mapStateToProps, {})(Sidebar);
export default SidebarContainer;