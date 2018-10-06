import React, { Component } from 'react';

class OutcomeListItem extends Component{
    constructor(props) {
        super(props);
        this.state = { balance: 0 };
    }
/*
   componentWillMount(){
        console.log('step 1 gets -  ' + this.props.balance);
        var newBalance = this.props.balance - this.props.amount;
        this.setState({ balance: newBalance });
        console.log('1 -  '+ newBalance);
        this.props.handleBalance(newBalance);
    }
    */
    render() {
        //console.log('step 1 render -  ' + this.state.balance);
        return(
            <tr>
                <td>{this.props.category}</td>
                <td>{this.props.date}</td>
                <td>{this.props.description}</td>
                <td>{this.props.amount}</td>
                <td>{this.props.balance}</td>
            </tr>   
        );
    }
}

export default OutcomeListItem;