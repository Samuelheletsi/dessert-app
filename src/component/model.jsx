import React, { useContext } from 'react';
import './com.css';
// import EmpSvgImage from './images/illustration-empty-cart.svg';
import ConfirmedImg from './images/icon-order-confirmed.svg';
// import CancelImg from './images/icon-remove-item.svg';
import { CartContext } from './CartContext';

const Cart = ({ toggleModal }) => {
  const { cart, removeItemFromCart, clearCart, placeOrder } = useContext(CartContext);

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cart.reduce((total, item) => total + item.totalPrice, 0);

  return (
    <div className="dessert-cart">
      <img className='confirmed' src={ConfirmedImg} alt="Order Confirmed" />
      <h1 className='md'>Order Confirmed</h1>
      <p className='md1'>We hope you enjoy the food.</p>
      {cart.length === 0 ? (
        <div>
          <div className="innerCart">
            {/* <img src={EmpSvgImage} alt="Empty Cart" /> */}
          </div>
          <p>Purchase done !</p>
          
        </div>
      ) : (
        <div className='item-boxm'>
          {cart.map((item) => (
            <div key={item.name} className="model-item">
              <div>
                <img src={item.picture} alt={item.name} />
                <p>{item.name}</p>
              </div>
              <div className='list'>
                <div className="in-list">
                  <p className='quat'>x{item.quantity}</p>
                  <p>@{item.price}</p>
                </div>
                <p>${item.totalPrice.toFixed(2)}</p>
                {/* Uncomment this button if remove functionality is needed */}
                {/* <button onClick={() => removeItemFromCart(item.name)}><img src={CancelImg}/></button> */}
              </div>
            </div>
          ))}
          <div className="cart-total">
            <div className="total-p">
              <p>Ordered Total:</p><p className='plus-p'>${totalPrice.toFixed(2)}</p>
            </div>
            {/* <button onClick={placeOrder}>Submit Order</button> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
