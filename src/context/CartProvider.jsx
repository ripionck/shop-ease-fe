import axios from 'axios';
import PropTypes from 'prop-types';
import { createContext, useCallback, useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';

// Create the CartContext
const CartContext = createContext({
  cartItems: [],
  loading: false,
  error: null,
  fetchCart: () => {},
  addToCart: () => {},
  updateCartItem: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
});

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { auth } = useAuth();

  // Create a reusable API instance with the latest access token
  const getApi = useCallback(() => {
    return axios.create({
      baseURL: 'https://shop-ease-3oxf.onrender.com/api/v1/',
      headers: {
        Authorization: auth?.accessToken
          ? `Bearer ${auth.accessToken}`
          : undefined,
      },
    });
  }, [auth?.accessToken]);

  // Fetch cart items from the server
  const fetchCart = useCallback(async () => {
    if (!auth?.accessToken) {
      setCartItems([]);
      return;
    }

    setLoading(true);
    setError(null); // Reset the error state before fetching
    try {
      const api = getApi();
      const response = await api.get('cart/');

      const serverItems = response.data?.cart?.products || [];

      if (!Array.isArray(serverItems)) {
        throw new Error('Invalid server response format');
      }

      setCartItems((prev) =>
        serverItems.map((serverItem) => {
          const localItem = prev.find((item) => item.id === serverItem.id);
          return localItem || serverItem; // Use the server item or keep local one
        }),
      );
    } catch (err) {
      console.error('Cart fetch error:', err);
      setError(err.response?.data?.message || 'Failed to fetch cart');
    } finally {
      setLoading(false);
    }
  }, [getApi, auth?.accessToken]);

  // Automatically fetch cart items on component mount/auth change
  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  // Add a product to the cart
  const addToCart = async (productId, quantity = 1) => {
    if (!auth?.user) {
      setError('You must be logged in to add items to cart');
      return false;
    }

    setLoading(true);
    setError(null);
    try {
      const api = getApi();
      await api.post('cart/add/', { product_id: productId, quantity });
      await fetchCart(); // Refresh cart after adding an item
      return true;
    } catch (err) {
      console.error('Error adding to cart:', err);
      setError(err.response?.data?.message || 'Failed to add item to cart');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Update the quantity of an item in the cart
  const updateCartItem = async (itemId, quantity) => {
    if (!auth?.user) {
      setError('You must be logged in to update the cart');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const api = getApi();
      await api.patch(`cart/update/${itemId}/`, { quantity });

      setCartItems((prev) =>
        prev.map((item) => (item.id === itemId ? { ...item, quantity } : item)),
      );
    } catch (err) {
      console.error('Error updating cart item:', err);
      setError(err.response?.data?.message || 'Failed to update cart item');
    } finally {
      setLoading(false);
    }
  };

  // Remove an item from the cart
  const removeFromCart = async (itemId) => {
    if (!auth?.user) {
      setError('You must be logged in to modify the cart');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const api = getApi();
      await api.delete(`cart/remove/${itemId}/`);

      setCartItems((prev) => prev.filter((item) => item.id !== itemId));
    } catch (err) {
      console.error('Error removing cart item:', err);
      setError(err.response?.data?.message || 'Failed to remove cart item');
    } finally {
      setLoading(false);
    }
  };

  // Clear the cart (frontend-only, no API call)
  const clearCart = () => {
    setCartItems([]);
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

export { CartContext, CartProvider };
