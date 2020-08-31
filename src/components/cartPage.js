import React, { Component } from 'react';
import CartProductCart from './cartProductCard';

import '../styles/cartPageStyles.css';

export default class CartPage extends Component {

  state = {
    cartProducts: [],
    subTotal: 351,
    shippingPrice: 19,
    total: 371
  }

  componentDidMount() {
    this.getCartProducts();
  }
  calculateAmount = (updateItem = {}) => {
    // debugger
    if (Object.keys(updateItem).length !== 0) {
      this.setState({
        cartProducts: this.state.cartProducts.map(product => {
          if (product.id === updateItem.id) {
            product.quantity = updateItem.quantity
          }
          return product;
        })
      })
    }
    let quantities = this.state.cartProducts.reduce((acc, product) => acc + (product.quantity * product.price), 0)
    console.log(quantities)
    // let quantities = this.state.cartProducts.map(product => product.quantity)
    this.setState({
      subTotal: quantities,
      total: quantities + this.state.shippingPrice
    })
  }


  getCartProducts = () => {
    console.log(this.props)
    fetch(`http://localhost:3001/carts/${this.props.user.id}`, {
      method: 'GET'
    })
    .then((response) => response.json())
    .then(data => {
      console.log('cart data', data)
      this.setState({
        cartProducts: data
      }, () => this.calculateAmount());
    });
  }

  render() {
    return (
      <div>
        <div className="cartPageContainer">

          <div className="productsContainer">
            {this.state.cartProducts.map(product => <CartProductCart
              product={product}
              key={product.id}
              user={this.props.history?.user}
              calculateAmount={this.calculateAmount}
            />)}
          </div>

          <div className="checkoutContainer">
            <div className="checkoutInfoSpanContainer">
              <span className="checkoutInfoSpan">
                Item Subtotal:
              </span>
              <span className="checkoutInfoSpan">
                ${this.state.subTotal}
              </span>
            </div>

            <div className="checkoutInfoSpanContainer">
              <span className="checkoutInfoSpan">
                Shipping Price:
              </span>
              <span className="checkoutInfoSpan">
                ${this.state.shippingPrice}
              </span>
            </div>

            <div className="checkoutInfoSpanContainer">
              <span className="checkoutInfoSpan">
                Estimated Tax:
              </span>
              <span className="checkoutInfoSpan">
                $0
              </span>
            </div>

            <hr/>
            <div className="totalSpanContainer">
              <span className="checkoutTotal">
                Total:
              </span>
              <span className="checkoutTotal">
                ${this.state.total}
              </span>
            </div>
            <div className="cartBuyProductButtonContainer">
              <button className="CartBuyProduct">
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
