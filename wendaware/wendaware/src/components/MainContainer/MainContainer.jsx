import React from "react";
import {connect} from "react-redux";
import mapStateToProps from "react-redux/lib/connect/mapStateToProps";

class MainContainer extends React.Component{
    render() {
        return <Main {...this.props} />
    }
}
export default connect(mapStateToProps, {})(MainContainer);
