import React, { useState, useEffect, useContext } from 'react';
import Cart from './Cart';
import DessertBlog from './DessertBlog';
import { CartContext } from './CartContext';
import './com.css';
import Mod from './model';

const Content = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { placeOrder } = useContext(CartContext);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleClickOutside = (event) => {
    if (event.target.classList.contains('modal')) {
      setIsModalOpen(false);
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      window.addEventListener('click', handleClickOutside);
    } else {
      window.removeEventListener('click', handleClickOutside);
    }

    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, [isModalOpen]);

  return (
    <div className='content'>
      <DessertBlog />
      <div>
        <Cart toggleModal={toggleModal} />
      </div>
      {isModalOpen && (
        <div className="modal">
          <div className="modal-body">
            <Mod />
            <button className='final-sub' onClick={placeOrder}>Confirmed Order</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Content;
