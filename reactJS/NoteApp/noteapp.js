class Search extends React.Component{
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
        let resetSearch = false;
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


class Color extends React.Component{
    constructor(props){
        super(props);
        this.state = { 
          colors: [{ 
                        name: 'yellow', 
                        id:1
                    },{
                        name: 'red',
                        id: 2
                    },{
                        name:'purple',
                        id: 3
                    },{
                        name:'blue',
                        id: 4
                    }]   
        };
        this.handleColorPick = this.handleColorPick.bind(this);
    }
    handleColorPick(e){
        var newColor = e.target.value;
        this.setState({ color: newColor});
        this.props.onColorChange(newColor);
    }

    componentDidMount() {
        var basicColor = this.refs.color.value;
        this.setState({ color: basicColor });
        this.props.onColorChange(basicColor);
    }

    render(){
        return(
            <div className="color-picker">
                {
                    this.state.colors.map( (color) => { 
                        let style = {backgroundColor: color.name}; 
                        return (<input className="pick-color" ref="color" key={color.id} onClick={this.handleColorPick} defaultValue={color.name} style={style} />); 
                    })
                }
            </div>
        );
    }
}


class NoteEditor extends React.Component{
    constructor(props){
        super(props);
        this.state = {text: ''};
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleNoteAdd = this.handleNoteAdd.bind(this);
        this.handleNewColor = this.handleNewColor.bind(this);
    }

    handleTextChange(e){
        this.setState({ text: e.target.value });    
    }

    handleNoteAdd(){

        var newNote = {
            text: this.state.text,
            id: Date.now(),
            color: this.state.color
        };
        this.props.onNoteAdd(newNote);
        this.setState({ text: '' });
    }

    handleNewColor(color){
        this.setState({ color: color });
    }

    render(){
        return(
            <div className="note-editor">
                <textarea className="textarea" rows={5} placeholder="Type your note text" onChange={this.handleTextChange} value={this.state.text}></textarea>
                <Color onColorChange={this.handleNewColor} />
                <button className="add-button" onClick={this.handleNoteAdd}>Add</button>
            </div>
        );
    }
}


class Note extends React.Component{
    render(){
        var style = { backgroundColor: this.props.color };
        return(
            <div className="note" style={style}>
                <span className="delete-note" onClick={this.props.onDelete}>x</span>
                {this.props.children}
            </div>
        );
    }
}


class NotesGrid extends React.Component{
    constructor(props) {
        super(props);
    }

    componentDidMount(){
        var grid = this.refs.grid;
        this.msnry = new Masonry(grid, {
            itemSelector: '.note',
            columnWidth: 200,
            gutter: 10
        });
    }

    componentDidUpdate(prevProps){
        if(this.props.notes.length !== prevProps.notes.length){
            this.msnry.reloadItems();
            this.msnry.layout();
        }
    }

    render(){
        var onNoteDelete = this.props.onNoteDelete;

        const result = (this.props.notes.length > 0) 
                        ? this.props.notes.map((note) => <Note key={note.id} onDelete={onNoteDelete.bind(null, note)} color={note.color}>{note.text}</Note>)
                        :<h1>No notes found...</h1>;

        return(
            <div className="notes-grid" ref="grid">
                {result}
            </div>
        );
    }
}


class NoteApp extends React.Component{
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



ReactDOM.render(
    <NoteApp />,
    document.getElementById('root')
);
