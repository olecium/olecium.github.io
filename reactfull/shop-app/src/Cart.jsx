import React, { Component } from 'react';
import Menu from './Menu';

class Cart extends Component{
    render(){
        return(
            <div className='cart'>
                <Menu />
                <h1>Cart</h1>
            </div>
        )
    }
}

export default Cart;