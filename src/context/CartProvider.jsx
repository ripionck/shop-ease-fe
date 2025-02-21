import axios from 'axios';
import PropTypes from 'prop-types';
import { useState } from 'react';
import useAuth from '../hooks/useAuth';
import CartContext from './CartContext';

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { auth } = useAuth();

  const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/v1/',
    headers: {
      Authorization: `Bearer ${auth.accessToken}`,
    },
  });

  const fetchCart = async () => {
    setLoading(true);
    try {
      const response = await api.get('cart/');
      setCartItems(response.data.items || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch cart');
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId, quantity = 1) => {
    if (!auth.user) {
      setError('You must be logged in to add items to cart');
      return;
    }

    setLoading(true);
    try {
      const response = await api.post('cart/add/', {
        product_id: productId,
        quantity,
      });
      setCartItems((prev) => [...prev, response.data]);
      return true;
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || 'Failed to add item to cart';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const updateCartItem = async (itemId, quantity) => {
    if (!auth.user) {
      setError('You must be logged in to update cart');
      return;
    }

    setLoading(true);
    try {
      const response = await api.put(`cart/update/${itemId}/`, { quantity });
      setCartItems((prev) =>
        prev.map((item) => (item.id === itemId ? response.data : item)),
      );
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update cart item');
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (itemId) => {
    if (!auth.user) {
      setError('You must be logged in to modify cart');
      return;
    }

    setLoading(true);
    try {
      await api.delete(`cart/remove/${itemId}/`);
      setCartItems((prev) => prev.filter((item) => item.id !== itemId));
    } catch (err) {
      setError(
        err.response?.data?.message || 'Failed to remove item from cart',
      );
    } finally {
      setLoading(false);
    }
  };

  const clearCart = async () => {
    if (!auth.user) {
      setError('You must be logged in to clear cart');
      return;
    }

    setLoading(true);
    try {
      await api.delete('cart/clear/');
      setCartItems([]);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to clear cart');
    } finally {
      setLoading(false);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        loading,
        error,
        fetchCart,
        addToCart,
        updateCartItem,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
