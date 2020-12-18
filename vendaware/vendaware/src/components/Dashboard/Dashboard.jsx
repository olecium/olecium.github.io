import React from "react";
import css from "./Dashboard.module.scss";
import AbandonedSales from "../AbandonedSales/AbandonedSales";
import BarChart from "../BarChartExample/BarChartExample";
import "../../../node_modules/flexlayout-react/style/dark.css";
import VendEfficiency from "../VendEfficiency/VendEfficiency";
import FailedVends from "../FailedVends/FailedVends";

class Dashboard extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            addGraphicMenu: false,
            graph: '',
        }
        this.onAddGraphic = this.onAddGraphic.bind(this);
        this.addGraph = this.addGraph.bind(this);
    }
    componentDidMount() {
        this.props.getGoodSalesData();
        this.props.getFailedSalesData();
        this.props.getAllFailedSalesData();
    }
    onAddGraphic(e) {
        e.preventDefault();
        this.setState({
            addGraphicMenu: !this.state.addGraphicMenu
        });
    }
    addGraph(e, graph){
        e.preventDefault();
        let showComponent = '';
        switch(graph){
            case 'bar': showComponent = [...this.state.graph, <BarChart key={"bar"}/>]; break;
            case 'abSales': showComponent = [...this.state.graph, <AbandonedSales  key={"abSales"} />]; break;
            case 'vendEfficiency': showComponent = [...this.state.graph, <VendEfficiency key={"vendEfficiency"} {...this.props}/>]; break;
            case 'failedVends': showComponent = [...this.state.graph, <FailedVends key={"failedVends"} {...this.props}/>]; break;
            default: showComponent = ''; break;
        }
        this.setState({
            graph: showComponent
        });
    }

    render() {
        return (
            <div className={css.dashboard_wrapper}>
                <h1>Dashboard</h1>
                <div className="panel">
                    <button onClick={this.onAddGraphic}>Add graphic +</button>
                </div>
                {this.state.addGraphicMenu &&
                <ul>
                    <li><button onClick={(e) => {this.addGraph(e,'bar')}}>Bar Chart</button></li>
                    <li><button onClick={(e) => {this.addGraph(e,'abSales')}}>Abandoned Sales</button></li>
                    <li><button onClick={(e) => {this.addGraph(e,'vendEfficiency')}}>Vend Efficiency</button></li>
                    <li><button onClick={(e) => {this.addGraph(e,'failedVends')}}>Failed Vends</button></li>
                </ul>
                }
                <div className={css.dashboard}>
                    {this.state.graph}
                </div>
            </div>
        );
    }
}

export default Dashboard;
