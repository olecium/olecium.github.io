import React, { Component } from 'react';
import data from './articles.json';
import './App.css';
import Search from './Search.jsx';
import About from './About.jsx';
import Articles from './Articles.jsx';
import { Route, Link } from 'react-router-dom';

class App extends Component {
  constructor(props){
    super(props);
    this.state = { articles: [], displayedItems: [] };
    this.handleItemsSearch = this.handleItemsSearch.bind(this);
  }

  loadData() {
    var mdata = JSON.stringify(data);
    var mydata = JSON.parse(mdata); 
    this.setState({ articles: mydata, displayedItems: mydata });
  }

  componentWillMount(){
    this.loadData();
  }

  handleItemsSearch(displayedNews){
    let searchedNews = displayedNews.slice();
    this.setState({ articles: this.state.articles, displayedItems: searchedNews });
  }


  render() {
    return (
      <div>
        <div className="menu">
          <ul>
            <li><Link to='/about'>About</Link></li>
            <li><Link to='/articles'>Articles</Link></li>
          </ul>
        </div>
        {this.props.children}
        <Search articles={this.state.articles} onSearch={this.handleItemsSearch} /> 
        <Route path={`/about`} component={About} />
        <Route path={`/articles`} component={Articles} />
      </div>
    );
  }
}

export default App;
