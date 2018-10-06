import React, { Component } from 'react';
import Color from './Color.jsx';
import PropTypes from 'prop-types';

class NoteEditor extends Component{
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

        let newNote = {
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

NoteEditor.propTypes = {
    onNoteAdd: PropTypes.func,
}

export default NoteEditor;