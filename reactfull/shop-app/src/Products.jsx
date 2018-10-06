import React, { Component } from 'react';
import Menu from './Menu';
import products from './productslist.json';
import { Route, Link } from 'react-router-dom';
import Product from './Product';
import './Products-List.css';

class Products extends Component{

    constructor(props){
        super(props);
        this.state = { cart: [] }
        this.handleCart = this.handleCart.bind(this);
    }

    handleCart(val){
        let uCart = this.state.cart.slice();
        uCart.push(val);
        console.log(uCart);
        this.setState({ cart: uCart });
    }

    render(){
        return(
            <div className='products'>
                <Menu />
                <h1>Products</h1>
               
                <div className='products-list'>
                    {
                        products.map(p =>
                            <Link
                                to={`/products/${p.id}`}
                                key={p.id} className='products-list__item'
                                cart={this.state.cart} 
                                onCartChange={this.handleCart}
                            >
                                <div className="products-list__item-image">
                                    <img src={`images/${p.image}`} alt="" />
                                </div>
                                <span className='products-list__item-title'>{p.title}</span>
                                <span className='products-list__item-price'>&pound;{p.price}</span>
                            </Link>
                        )
                    }
                </div>
            </div>
        )
    }
}

export default Products;