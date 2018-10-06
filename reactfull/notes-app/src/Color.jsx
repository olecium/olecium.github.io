import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Color extends Component{
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
        let newColor = e.target.value;
        this.setState({ color: newColor});
        this.props.onColorChange(newColor);
    }

    componentDidMount() {
        let basicColor = this.refs.color.value;
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

Color.propTypes = {
    onColorChange: PropTypes.func,
}

export default Color;