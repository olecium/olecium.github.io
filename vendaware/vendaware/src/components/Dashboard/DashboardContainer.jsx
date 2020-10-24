import React from "react";
import Dashboard from "./Dashboard";
import {connect} from "react-redux";
import {addGraphic, getFailedSalesData, getGoodSalesData, getAllFailedSalesData} from "../../redux/dashboard-reducer";
import {compose} from "redux";

class DashboardContainer extends React.Component{

    render(){
        return(
            <Dashboard {...this.props}
                       addGraphic={this.props.addGraphic}
                       getGoodSalesData={this.props.getGoodSalesData}
                       getFailedSalesData={this.props.getFailedSalesData}
                       getAllFailedSalesData={this.props.getAllFailedSalesData}
            />
        );
    }
}

let mapStateToProps = (state) => {
    return {
        goodSales: state.dashboard.goodSales,
        failedSales: state.dashboard.failedSales,
        allFailedSales: state.dashboard.allFailedSales
    }
}

export default compose(connect(mapStateToProps, {addGraphic, getGoodSalesData, getFailedSalesData, getAllFailedSalesData})(DashboardContainer));
