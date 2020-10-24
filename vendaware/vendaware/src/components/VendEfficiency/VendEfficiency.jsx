import React, { Component } from "react";
import { XAxis, YAxis, Tooltip, BarChart, Bar} from 'recharts';

class VendEfficiency extends Component {
    render() {

        const goodVends = parseInt(this.props.goodSales);
        const failedVends = parseInt(this.props.failedSales);
        const totalVends = goodVends + failedVends;
        let goodVendsPercentage = Math.round((100 * goodVends) / totalVends);
        let failedVendsPercentage = Math.round((100 * failedVends) / totalVends);
        const data = [
            { name: '2020', good: goodVendsPercentage, failed: failedVendsPercentage }
        ];

        return (
            <div>
                <h2>Vend Efficiency</h2>
                <BarChart
                    width={450}
                    height={150}
                    data={data}
                    margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                    layout="vertical"
                >
                    <XAxis type="number" tick={{fontSize: '11px'}} tickCount={11} tickFormatter={t=>t+"%"}/>
                    <YAxis dataKey="name" tick={{fontSize: '11px'}} type="category" />
                    <Tooltip />
                    <Bar dataKey="good" fill="#387908" stackId="sales"  />
                    <Bar dataKey="failed" fill="#ff7300" stackId="sales"  />
                </BarChart>
            </div>
        )
    }
}
export default VendEfficiency;
