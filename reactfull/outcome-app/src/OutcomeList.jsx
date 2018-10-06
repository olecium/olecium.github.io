import React, { Component } from 'react';
import OutcomeListItem from './OutcomeListItem.jsx';

class OutcomeList extends Component{
    constructor(props) {
        super(props);
        //var currentBalance = this.props.balance;
        this.state = { balance: this.props.balance };
      //  this.CalculateBalanceLeft = this.CalculateBalanceLeft.bind(this);
    }
/*
    componentWillMount(){
        var blc = (this.state.balance) ? this.state.balance : this.props.balance;
        this.setState({ balance: blc });
        console.log('s2 mount - '+blc);
    }

    componentWillUpdate(){
        console.log('s2 - update');
    }
*//*
    CalculateBalanceLeft(balance) {
       // var newBalance = this.state.balance;
        this.setState({ balance: balance });
        console.log('2 - ' + balance);
        this.props.changeBalance(balance);
    }*/

    render(){
        //console.log('render on step 2 - '+this.state.balance);
        return (
            this.props.outcome.map((item) =>  
                <OutcomeListItem 
                    key={item.id} 
                    category={item.categoryId} 
                    date={item.date} 
                    description={item.description} 
                    amount={item.amount} 
                    balance={item.balance} 
                /> 
            )

        );
    }
}

export default OutcomeList;