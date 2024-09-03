import React, { useContext } from 'react';
import './com.css';
import EmpSvgImage from './images/illustration-empty-cart.svg';
import CancelImg from './images/icon-remove-item.svg';
import CarbonImg from './images/icon-carbon-neutral.svg';
import { CartContext } from './CartContext';

const Cart = ({ toggleModal }) => {
  const { cart, removeItemFromCart, clearCart } = useContext(CartContext);

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cart.reduce((total, item) => total + item.totalPrice, 0);

  return (
    <div className="dessert-cart">
      <h1>Your Cart ({totalItems})</h1>
      {cart.length === 0 ? (
        <div>
          <div className="innerCart">
            <img src={EmpSvgImage} alt="Empty Cart" />
          </div>
          <p>Your added items will appear here</p>
        </div>
      ) : (
        <div className='item-box'>
          {cart.map((item) => (
            <div key={item.name} className="cart-item">
              
              <div>
              <img src={item.picture} alt={item.name} /> <p>{item.name}</p>
              </div>
              <div className='list'>
                  <div className="in-list">
                  <p className='quat'>x{item.quantity}</p>
                  <p>@{item.price}</p>
                  <p>${item.totalPrice.toFixed(2)}</p>
                  </div>
                  <button onClick={() => removeItemFromCart(item.name)}><img src={CancelImg}/></button>
                </div>
               
            </div>
          ))}
          <div className="cart-total">
            <div className="carbon">
              <img src={CarbonImg} />
              <p>This is a carbon neutral delivery</p>
            </div>
          <div className="total-p">
                <p>Order Total:</p><p className='plus-p'> ${totalPrice.toFixed(2)}</p>
           </div>
            <button onClick={toggleModal}>Confirm Order</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
