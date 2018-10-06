import React from 'react';

import './Contact.css';

class Contact extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isOpen: false };
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(e) {
        this.setState(prevState => ({ isOpen: !prevState.isOpen }));
    }

    render() {
        return (
            <div className="contact">
                <div className="contact-shortinfo">
                    <img className="contact-image" src={this.props.image} width="60px" height="60px" />
                    <div className="contact-name" onClick={this.handleClick}>{this.props.name}</div>
                    <div className="contact-number">{this.props.phoneNumber}</div>
                </div>
                {
                    this.state.isOpen ? <div className="contact-more"><div className="contact-address">{this.props.address}</div></div> : ''
                }

            </div>
        );
    }
}

module.exports = Contact;