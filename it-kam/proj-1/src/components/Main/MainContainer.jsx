import React from "react";
import { connect } from "react-redux";

class MainContainer extends React.Component {
    render() {
        return <Main {...this.props}/>
    }
}

export default connect(mapStateToProps, {})(MainContainer);