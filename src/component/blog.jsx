import React, { Component } from 'react';
import './com.css';
import AddSvgImage from './images/icon-add-to-cart.svg';
import PlusImage from './images/icon-increment-quantity.svg';
import SubImage from './images/icon-decrement-quantity.svg';
import { CartContext } from './CartContext';

class Blog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showButton: true,
      quantity: 1,
    };
  }

  static contextType = CartContext;

  handleButtonClick = () => {
    const { picture, name, price } = this.props;
    const { addItemToCart } = this.context;
    addItemToCart({ picture, name, price, quantity: this.state.quantity });
    this.setState({ showButton: false });
  };

  handleIncrement = () => {
    this.setState(
      (prevState) => ({
        quantity: prevState.quantity + 1,
      }),
      () => {
        this.updateCart();
      }
    );
  };

  handleDecrement = () => {
    this.setState(
      (prevState) => ({
        quantity: Math.max(0, prevState.quantity - 1),
      }),
      () => {
        if (this.state.quantity === 0) {
          this.setState({ showButton: true });
        } else {
          this.updateCart();
        }
      }
    );
  };

  updateCart = () => {
    const { picture, name, price } = this.props;
    const { updateItemQuantity } = this.context;
    updateItemQuantity({ picture, name, price, quantity: this.state.quantity });
  };

  componentDidUpdate(prevProps, prevState) {
    const { quantity } = this.state;
    const { picture, name } = this.props;
    const { cart, removeItemFromCart } = this.context;

    // Check if the item was removed from the cart externally
    const cartItem = cart.find((item) => item.name === name);
    if (!cartItem && prevState.showButton === false) {
      this.setState({ showButton: true, quantity: 1 });
    }

    // Handle if quantity is zero and remove item from cart
    if (quantity === 0) {
      removeItemFromCart(name);
    }
  }

  render() {
    const { cl, picture, name, rname, price } = this.props;
    const { showButton, quantity } = this.state;

    return (
      <div className={`blog ${cl}`}>
        <img src={picture} alt={name} />
        {showButton ? (
          <button onClick={this.handleButtonClick}>
            <img src={AddSvgImage} alt="Add to Cart" />
            <p>Add To Cart</p>
          </button>
        ) : (
          <div className="added-to-cart">
            <div className="incrementImg" tabIndex="0" onClick={this.handleIncrement}>
              <img src={PlusImage} alt="Increment" />
            </div>
            <p>x{quantity}</p>
            <div className="decrementImg" tabIndex="0" onClick={this.handleDecrement}>
              <img src={SubImage} alt="Decrement" />
            </div>
          </div>
        )}
        <div className="para">
          <p className="p1">{name}</p>
          <p className="p2">{rname}</p>
          <p className="p3">${price}</p>
        </div>
      </div>
    );
  }
}

export default Blog;
