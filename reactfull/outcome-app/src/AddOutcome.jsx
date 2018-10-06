import React, { Component } from 'react';

class AddOutcome extends Component{
    constructor(props){
        super(props);
        this.state = { amount: 0, description: '', category: 1 };
        this.handleAddOutcome = this.handleAddOutcome.bind(this);
        this.amountChange = this.amountChange.bind(this);
        this.descrChange = this.descrChange.bind(this);
        this.catChange = this.catChange.bind(this);
    }

    amountChange(e){
        this.setState({ amount: e.target.value });
    }

    descrChange(e){
        this.setState({ description: e.target.value });
    }

    catChange(e){
        this.setState({ category: e.target.value });
    }

    handleAddOutcome(){
        this.props.handleOutcome(this.state.amount, this.state.description, this.state.category);
    }

    render(){

        let heading = (this.props.buttonId === 1) ? 'Please add your income': 'Please add your outcome'; 

        return (
            <div>
                <h3>{heading}</h3>
                <label htmlFor="amount">Amount</label>
                <input type="text" onChange={this.amountChange} />
                <label htmlFor="description">Description</label>
                <input type="text" onChange={this.descrChange} />
                <label htmlFor="category">Category</label>
                <select onChange={this.catChange} value={this.state.category}>
                    <option value="1">Food</option>
                    <option value="2">Income</option>
                    <option value="3">Distractions</option>
                    <option value="4">Shopping</option>
                </select>
                <button onClick={this.handleAddOutcome}>Add</button>
            </div>
            );
    }
}

export default AddOutcome;