import React, {Component} from "react";
import FailedVends from "./FailedVends";
import Preloader from "../../common/Preloader/Preloader";
import {compose} from "redux";
import {connect} from "react-redux";
import {getAllFailedSalesData, getFailuresByYear} from "../../redux/dashboard-reducer";


class FailedVendsContainer extends Component {


    componentDidMount() {
        this.props.getAllFailedSalesData();
        //console.log(this.props.allFailedSalesData);
        //this.props.getFailuresByYear(this.props.allFailedSalesData);
    }


    render(){

        return(
            <>
                {this.props.isFetching ? <Preloader /> : null}
                <FailedVends {...this.props}
                             getFailuresByYear={this.props.getFailuresByYear}
                             getAllFailedSalesData={this.props.getAllFailedSalesData}
                />
            </>
        );
    }
}
let mapStateToProps = (state) => {
    return {
        allFailedSalesData: state.dashboard.allFailedSalesData,
        graphData: state.dashboard.graphData,
        isFetching: state.dashboard.isFetching
    }
}

export default compose(connect(mapStateToProps, {getFailuresByYear, getAllFailedSalesData})(FailedVendsContainer));
