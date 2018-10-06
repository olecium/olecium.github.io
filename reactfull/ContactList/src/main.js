var ReactDOM = require('react-dom');
var React = require('react');
var ContactList = require('./components/ContactList.jsx');

ReactDOM.render(
    <ContactList />,
    document.getElementById('mount-point')
);