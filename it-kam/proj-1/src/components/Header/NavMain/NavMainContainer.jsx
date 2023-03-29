import React from "react";
import { connect } from "react-redux";
import NavMain from "./NavMain";
import { userLogout} from "./../../../redux/auth-reducer";


class NavMainContainer extends React.Component {
    
    render() {
        return <NavMain {...this.props} />
    }
}

let mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        login: state.auth.login,
        userId: state.auth.userId
    }
}
export default connect(mapStateToProps,{ userLogout })(NavMainContainer);