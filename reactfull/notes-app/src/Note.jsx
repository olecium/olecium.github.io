import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Note extends Component{
    render(){
        let style = { backgroundColor: this.props.color };
        return(
            <div className="note" style={style}>
                <span className="delete-note" onClick={this.props.onDelete}>x</span>
                {this.props.children}
            </div>
        );
    }
}

Note.propTypes = {
  color: PropTypes.string,
  children: PropTypes.string.isRequired,
  onDelete: PropTypes.func,
};

export default Note;
