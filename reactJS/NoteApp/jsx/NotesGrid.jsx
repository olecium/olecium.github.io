import React, { Component } from 'react';

class NotesGrid extends Component{
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

export default NotesGrid;