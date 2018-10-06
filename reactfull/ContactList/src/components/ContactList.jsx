import React from 'react';
import Contact from './contact.jsx';

import './ContactList.css';

var CONTACTS = [
    {
        id: 1,
        name: 'Darth Vader',
        phoneNumber: '+250966666666',
        address: '5 Bampton Croft',
        image: 'http://cs7.pikabu.ru/images/big_size_comm_an/2014-03_7/13962622876915.gif'
    }, {
        id: 2,
        name: 'Princess Leia',
        phoneNumber: '+250966344466',
        address: '116 Milton Road',
        image: 'http://images6.fanpop.com/image/photos/33100000/CARRIE-FISHER-anakin-vader-and-princess-leia-33186069-190-149.gif'
    }, {
        id: 3,
        name: 'Luke Skywalker',
        phoneNumber: '+250976654433',
        address: '145 Bear Croft',
        image: 'https://media.giphy.com/media/3oKIPvQWkVBKRkPYJy/giphy.gif'
    }, {
        id: 4,
        name: 'Chewbacca',
        phoneNumber: '+250456784935',
        address: '67 Cranleigh Court Road',
        image: 'https://media.giphy.com/media/RUUdVZqwpfTRS/giphy.gif'
    }
];


class ContactList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { displayedContacts: CONTACTS };
        this.handleSearch = this.handleSearch.bind(this);
    }
    handleSearch(event) {
        var searchQuery = event.target.value.toLowerCase();
        var displayedContacts = CONTACTS.filter(function (el) {
            var searchValue = el.name.toLowerCase();
            return searchValue.indexOf(searchQuery) !== -1;
        });
        this.setState({ displayedContacts: displayedContacts });
    }

    render() {
        return (
            <div className="contacts">
                <input type="text" className="search-field" onChange={this.handleSearch} />
                <div className="contacts-list">
                    {this.state.displayedContacts.map((el) => <Contact key={el.id} name={el.name} phoneNumber={el.phoneNumber} image={el.image} address={el.address} />)}
                </div>
            </div>
        );
    }

}

module.exports = ContactList;