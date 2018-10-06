import React, { Component } from 'react';
import products from './productslist.json';
import Menu from './Menu';

class Product extends Component{
    constructor(props){
        super(props);
        this.handleAddToCart = this.handleAddToCart.bind(this);
        this.state = { cart: [] };
    }

    handleAddToCart(cart){
        let updCart = this.state.cart.slice();
        updCart.push(cart);

        this.setState({ 'cart': updCart });
        
        this.props.onCartChange(cart);
    }
    
    render(){

        const productId = this.props.match.params.productId;
        const product = products.find(({ id }) => id === productId);
        const pr = product;
        const prodid = pr.id;

        return(
            <div>
                <Menu />
                <div>
                    <img src={`../images/${pr.image}`} alt=""/>
                    <h4>{pr.title}</h4>
                    <p>{pr.description}</p>
                    <p><b>&pound;{pr.price}</b></p>
                    <button onClick={()=>this.handleAddToCart(prodid)}>Add to cart</button>
                </div>
            </div>
        )
    }
}

export default Product;