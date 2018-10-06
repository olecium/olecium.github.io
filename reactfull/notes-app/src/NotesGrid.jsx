import React, { Component } from 'react';
import Note from './Note.jsx';
import Masonry from 'masonry-layout';
import PropTypes from 'prop-types';

class NotesGrid extends Component{
    
    componentDidMount(){
        let grid = this.refs.grid;
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
        let onNoteDelete = this.props.onNoteDelete;

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

NotesGrid.propTypes = {
    notes: PropTypes.array,
    onNoteDelete: PropTypes.func,
}

export default NotesGrid;