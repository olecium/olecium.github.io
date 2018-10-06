import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Menu.css';

class Menu extends Component{
    render(){
        return(

            <nav className='menu'>
                <ul>
                    <li><Link to={`/home`}>Home</Link></li>
                    <li><Link to={`/products`}>Products</Link></li>
                    <li><Link to={`/cart`}>Cart</Link></li>
                </ul>
            </nav>
        )
    }
}

export default Menu;