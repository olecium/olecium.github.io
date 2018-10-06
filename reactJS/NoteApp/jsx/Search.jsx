import React, { Component } from 'react';

class Search extends Component{
    constructor(props){
        super(props);
        this.state = { search: '', displayedNotes: this.props.notes, value: '' };
        this.onSearch = this.onSearch.bind(this);
        this.onReset = this.onReset.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
        this.onSearchReset = this.onSearchReset.bind(this);
    }

    onTextChange(e){
        var searchQuery = e.target.value;
        this.setState({ search: searchQuery, value: searchQuery  });
    }

    onSearch(){
        let searchQuery = this.state.search.toLowerCase();
        
        var displayedNotes = this.props.notes.filter(function (el){
            let searchArrValue = el.text.toLowerCase();
            return searchArrValue.indexOf(searchQuery) !== -1;
        });

        this.setState({ displayedNotes: displayedNotes, value: searchQuery });
        letresetSearch = false;
        this.props.onNoteSearch(displayedNotes, resetSearch);
    }
    onReset(){
        this.setState({ displayedNotes: this.props.notes });
        let resetSearch = false;
        resetSearch = this.onSearchReset();
        this.props.onNoteSearch(this.props.notes, resetSearch);
    }

    componentDidMount() {
        this.props.onRef(this);
    }

    componentWillUnmount() {
        this.props.onRef(undefined);
    }

    onSearchReset(){
        this.setState({ value: '' });
        return true;
    }

    render(){ 
        return(
            <div className="search">
                <h6>Look for notes</h6>
                <input className="search-field" onChange={this.onTextChange} type="text" value={this.state.value} />
                <button onClick={this.onSearch} className="search-button">Search</button>
                <button onClick={this.onReset} className="reset-button">Show all notes</button>
            </div>
        );
    }
}

export default Search;