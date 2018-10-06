import React, { Component } from 'react';

class NoteApp extends Component{
    constructor(props){
        super(props);

        this.state = {
            notes: [],
            searchedNotes: [],
            value: ''
        };

        this.handleNoteAdd = this.handleNoteAdd.bind(this);
        this.handleNoteDelete = this.handleNoteDelete.bind(this);
        this.handleNoteSearch = this.handleNoteSearch.bind(this);
    }

    componentDidMount(){
        var localNotes = JSON.parse(localStorage.getItem('notes'));
        if(localNotes){
            this.setState({ notes: localNotes, searchedNotes: localNotes });
        }    
    }

    componentDidUpdate(){
        this._updateLocalStorage();
    }

    handleNoteDelete(note){
        var noteId = note.id;
        var newSearchedNotes = this.state.searchedNotes.filter((note) => note.id !== noteId);
        var newNotes = this.state.notes.filter((note) => note.id !== noteId);
        this.setState({ notes: newNotes, searchedNotes: newSearchedNotes });
        //this.child.onSearchReset();                 //reset search field
    }

    handleNoteAdd(newNote) {
        var newNotes = this.state.notes.slice();    // creating copy of the notes array
        newNotes.unshift(newNote); 
        this.setState({ notes: newNotes, searchedNotes: newNotes });        
        this.child.onSearchReset();                 //reset search field
    }

    handleNoteSearch(displayedNotes, resetSearch){
        var searchedNotes = displayedNotes.slice();
        if (resetSearch === true){
            this.setState({ searchedNotes: this.state.notes });
        }
        else{
            this.setState({ notes: this.state.notes, searchedNotes: searchedNotes});
        }
    }

    
    render(){
        return(
            <div className="note-app">
                <Search onRef={ref => (this.child = ref)} notes={this.state.searchedNotes} onNoteSearch={this.handleNoteSearch} value={this.state.value}/>
                <NoteEditor onNoteAdd={this.handleNoteAdd}/>
                <NotesGrid notes={this.state.searchedNotes} onNoteDelete={this.handleNoteDelete}/>
            </div>
        );
    }

    _updateLocalStorage(){
        var notes = JSON.stringify(this.state.notes);
        localStorage.setItem('notes', notes);
    }
}

export default NotesApp;