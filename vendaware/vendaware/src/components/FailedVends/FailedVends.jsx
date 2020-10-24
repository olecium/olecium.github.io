import React, { Component } from "react";
import { XAxis, YAxis, Tooltip, LineChart, CartesianGrid, Line, Legend} from 'recharts';

class FailedVends extends Component {
    render(){

        const allFailedVends = this.props.allFailedSales;



        /*
        * [
        *   {
        *   2019: [
        *           {month: 'January', fails: 400},
        *           {month: 'February', fails: 3},
        *   },
        *   {
        *   2020: [
        *           {month: 'January', fails: 400},
        *           {month: 'February', fails: 3},
        *         ]
        *   },
        * ]
        * */

        let arrangedFailedVends = new Array();
        allFailedVends.forEach(arrangeFailedVends);

        function arrangeFailedVends(item, i) {
            let failDate = new Date(allFailedVends[i].date);
            let failYear = failDate.getFullYear();

            //console.log(arrangedFailedVends.indexOf(failYear));
            if(arrangedFailedVends.indexOf(failYear) === -1) {
                arrangedFailedVends.push(failYear);
            }
            

        }
/*
        let options = { month: 'long'};
        console.log(new Intl.DateTimeFormat('en-US', options).format(failDate));
        console.log(failDate.getMonth()+1);

        console.log(failDate.getFullYear());

*/console.log(arrangedFailedVends);

        const failedVends = parseInt(this.props.failedSales);
        const data = [
            { name: 'January', failed: -1 },
            { name: 'February', failed: -100 },
            { name: 'March', failed: -5 },
            { name: 'April', failed: -500 },
            { name: 'May', failed: -10 },
        ];

        return(
            <LineChart width={730} height={250} data={data}
                       margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="failed" stroke="#82ca9d" />
            </LineChart>
        )
    }
}
export default FailedVends;
