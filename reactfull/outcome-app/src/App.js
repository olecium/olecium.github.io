import React, { Component } from 'react';
import './App.css';
import data from './data.json';
import OutcomeList from './OutcomeList.jsx';
import AddOutcome from './AddOutcome.jsx';

class App extends Component {
  constructor(props){
    super(props);
    this.state = { list: [], displayedItems: [], balance: 4000, currentBalance: 4000, showForm: false, buttonId: 0 };
    this.recalculateBalance = this.recalculateBalance.bind(this);
    this.handleAddOutcome = this.handleAddOutcome.bind(this);
  }

  loadData() {
    var mdata = JSON.stringify(data);
    var mydata = JSON.parse(mdata);
    this.setState({ list: mydata, displayedItems: mydata });
    this.recalculateBalance(mydata);
  }

  recalculateBalance(data){
    var tempBalance = this.state.balance;
    var r = x => Math.round(x * 100) / 100;
    var updatedTransactions = data.map((t) => {
                                tempBalance = tempBalance + parseFloat(t.amount);
                                t.balance = r(tempBalance);
                                return t;
                              });
    this.setState({ list: updatedTransactions, displayedItems: updatedTransactions, currentBalance: r(tempBalance) });
  }

  getDateNow(){
    let today = new Date();
    let dd = today.getDate();

    let mm = today.getMonth() + 1;
    const yyyy = today.getFullYear();
    if (dd < 10) {
      dd = `0${dd}`;
    }

    if (mm < 10) {
      mm = `0${mm}`;
    }
    today = `${dd}-${mm}-${yyyy}`;

    return today;
  }
/*
  jsonAddData(newArr){
    var currentData = JSON.parse(data);  //parse the JSON
    currentData.push(newArr);
    data = JSON.stringify(currentData); 
    //JSON.parse(JSON.stringify(currentData));
  }*/

  handleAddOutcome(amount, description, category){
    let amountSign = (this.state.buttonId === 1) ? '+' : '-';

    let amountParsed = parseFloat(amountSign + amount);

    let newOutcome = {
      "id": Date.now(),
      "date": this.getDateNow(),
      "amount": amountParsed,
      "description": description,
      "categoryId": category
    };
    let newList = this.state.list;
    newList.push(newOutcome);
    //this.jsonAddData(newOutcome);
    this.recalculateBalance(newList);
  }

  onClick(id){
    this.setState({ buttonId: id });
    this.setState({ showForm: true });
  }

  componentWillMount() {
    this.loadData();
  }

  componentDidMount() {
    var localOutcome = JSON.parse(localStorage.getItem('outcome'));
    if (localOutcome) {
      this.setState({ list: localOutcome, displayedItems: localOutcome });
    }
  }

  componentDidUpdate() {
    this._updateLocalStorage();
  }

  render() {

    return (
      <div className="App">
        <h1>Outcome Application</h1>
        <div>
          <button onClick={this.onClick.bind(this, 1)}>+</button>
          <span>Current Balance: {this.state.currentBalance} </span>
          <button onClick={this.onClick.bind(this, 0)}>-</button>
        </div>
        {this.state.showForm && <AddOutcome handleOutcome={this.handleAddOutcome} buttonId={this.state.buttonId} />}
        <div>
          <table>
            <thead>
            <tr>
              <th>&nbsp;</th>
              <th>Date</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Balance</th>
            </tr>
            </thead>
            <tbody>
              <OutcomeList outcome={this.state.displayedItems}  />
            </tbody>
          </table>
        </div>
       
      </div>
    );
  }


  _updateLocalStorage() {
    var outcome = JSON.stringify(this.state.list);
    localStorage.setItem('outcome', outcome);
  }

}

export default App;
