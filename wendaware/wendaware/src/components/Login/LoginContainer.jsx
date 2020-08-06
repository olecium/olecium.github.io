import React from "react";
import Login from "./Login";
import { connect } from "react-redux";
import {userLogin} from "../../redux/auth-reducer";

class LoginContainer extends React.Component {
    render() {
        return <Login {...this.props}/>
    }
}
let mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        userId: state.auth.userId
    }
}
export default connect(mapStateToProps, {userLogin})(LoginContainer);
