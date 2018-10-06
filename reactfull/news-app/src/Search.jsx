import React, {Component} from 'react';

class Search extends Component{
    constructor(props){
        super(props);
        this.state = { search: '', displayedNews: []};
        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    handleSearchChange(e){
        let searchQuery = e.target.value;
        this.setState({ search: searchQuery });
    }

    handleSearch(){
        let searchItem = this.state.search.toLowerCase();
        let searchedNews = this.props.articles.filter(
                                                    (el) => {
                                                        let currentText = el.text.toLowerCase();
                                                        return currentText.indexOf(searchItem) !== -1;
                                                    });
        this.setState({ search: searchItem, displayedNews: searchedNews});
        this.props.onSearch(searchedNews);
    }


    handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            this.handleSearch();
        }
    }

    render(){
        return(
            <div className="search">
                <input type="text" onChange={this.handleSearchChange} onKeyPress={this.handleKeyPress}/>
                <button onClick={this.handleSearch}>Search</button>
            </div>
        );
    }
}

export default Search;