import React, {Component} from "react";
import {getAllFailedSalesData, getTotalFailedSales, getTotalGoodSales} from "../../redux/dashboard-reducer";

class Graphic extends Component {
    constructor(props){
        super(props);
        console.log(props);
        this.props.addGraphic(props.type);
        const propsSpecific = this.getGraphicData(props.type);
    }
    getGraphicData (graphicType) {
        let propsSpecific = {};
        switch(graphicType){
            case "FailedVends": propsSpecific = {getAllFailedSalesData: getAllFailedSalesData}; break;
            case "AbandonedSales": {
                propsSpecific = {
                    getTotalFailedSales: getTotalFailedSales,
                    getTotalGoodSales: getTotalGoodSales
                }
                break;
            }
            default: break;
        return propsSpecific;
    }
/*
    createNewComponent(graphicType, propsSpecific){
        let MyComponent = Components[graphicType + "Component"];
        return <MyComponent {...propsSpecific} />;
    }
        components = {
            graphicType: graphicType,
        };*/
    render(){
            const TagName = this.components[this.props.type];

        return(
            <TagName />
        );
    }
}
export default Graphic;
