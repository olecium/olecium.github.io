import React, { Component } from "react";
import { XAxis, YAxis, Tooltip, LineChart, CartesianGrid, Line, Legend} from 'recharts';

class FailedVends extends Component {
    constructor(props) {
        super(props);
        this.state = {
            year: '2020'
        }
        this.getDataByYear = this.getDataByYear.bind(this);
        this.setData = this.setData.bind(this);
    }
     getDataByYear(year, arr) {
        const newArr = arr[year].map( k => ({name: k.month, failed: k.failures*(-1)}) );

        return newArr;
    }
    setData(year,arr) {
        this.getDataByYear(year, arr);
        this.setState({
            year: year
        })
    }
    render(){

        const allFailedVends = this.props.allFailedSales;

        const formatMonth = x => new Intl.DateTimeFormat('en-US',  { month: 'short'}).format(x);

        const transform = x => {
            let failDate = new Date(x.date);
            let failYear = failDate.getFullYear();
            let failMonth = formatMonth(failDate);

            return { ...x, year: failYear, month: failMonth };
        }

        const transformed = allFailedVends.map(transform);

        // Generate an array of 12 months
        const months = Array.from(Array(12).keys()).map(m => m = new Date().setMonth(m)).map(formatMonth);

        const result = {};
        transformed.forEach(x => {
            if (!result[x.year])
                result[x.year] = months.map(m => ({month:m, failures:0}));

            result[x.year].find(m => m.month === x.month).failures++;
        });


        const dataFinal = this.getDataByYear(this.state.year, result);

        //const failedVends = parseInt(this.props.failedSales);
        const data = dataFinal;
        /*
        const data = [
            { name: 'January', failed: -1 },
            { name: 'February', failed: -100 },
            { name: 'March', failed: -5 },
            { name: 'April', failed: -500 },
            { name: 'May', failed: -10 },
        ];*/

        return(
            <div>
                <h2>Failed Vends</h2>
                <nav>
                    <ul>
                        <li><button onClick={(e) => {this.setData('2019', result)}}>2019</button></li>
                        <li><button onClick={(e) => {this.setData('2020', result)}}>2020</button></li>
                    </ul>
                    <select name="country" id="">
                        <option value="All">Overall</option>
                        <option value="Italy">Italy</option>
                        <option value="France">France</option>
                        <option value="UK">UK</option>
                    </select>
                    <select name="country" id="">
                        <option value="DUCALE">Ducale 30193</option>
                        <option value="LEI">LEI 4596</option>
                        <option value="Nikko">Nikko 6749</option>
                    </select>
                </nav>
                <LineChart width={1100} height={250} data={data}
                           margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="failed" stroke="#82ca9d" />
                </LineChart>
            </div>
        )
    }
}
export default FailedVends;
