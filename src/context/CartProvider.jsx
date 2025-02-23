import axios from 'axios';
import PropTypes from 'prop-types';
import { useCallback, useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';
import CartContext from './CartContext';

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { auth } = useAuth();

  // Create API instance with the latest access token
  const getApi = useCallback(() => {
    return axios.create({
      baseURL: 'https://shop-ease-3oxf.onrender.com/api/v1/',
      headers: {
        Authorization: `Bearer ${auth?.accessToken}`,
      },
    });
  }, [auth?.accessToken]);

  // Fetch cart items
  const fetchCart = useCallback(async () => {
    if (!auth?.accessToken) {
      setCartItems([]);
      return;
    }

    setLoading(true);
    try {
      const api = getApi();
      const response = await api.get('cart/');

      // Merge local changes with server state
      setCartItems((prev) => {
        const serverItems = response.data?.cart?.products || [];
        if (!Array.isArray(serverItems)) return prev;

        // Preserve local modifications that haven't been synced
        return serverItems.map((serverItem) => {
          const localItem = prev.find((item) => item.id === serverItem.id);
          return localItem || serverItem;
        });
      });
    } catch (err) {
      console.error('Error fetching cart:', err);
    } finally {
      setLoading(false);
    }
  }, [getApi, auth?.accessToken]);

  // Fetch cart only on mount/auth change
  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  // Add item to cart
  const addToCart = async (productId, quantity = 1) => {
    if (!auth?.user) {
      setError('You must be logged in to add items to cart');
      return false;
    }

    setLoading(true);
    try {
      const api = getApi();
      const response = await api.post('cart/add/', {
        product_id: productId,
        quantity,
      });

      // If the backend returns the updated cart, use it
      if (response.data && Array.isArray(response.data.cart.products)) {
        setCartItems(response.data.cart.products);
      } else {
        // Fallback to optimistic update
        setCartItems((prev) => {
          if (!Array.isArray(prev)) {
            console.error('prev is not an array:', prev);
            return [response.data]; // Fallback to a new array
          }
          return [...prev, response.data]; // Add the new item to the cart
        });
      }

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

  // Update cart item quantity
  const updateCartItem = async (itemId, quantity) => {
    if (!auth?.user) {
      setError('You must be logged in to update cart');
      return;
    }

    setLoading(true);
    try {
      const api = getApi();
      await api.patch(`cart/update/${itemId}/`, { quantity });

      // Optimistic update: Update the specific item in the cart
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

  // Remove item from cart
  const removeFromCart = async (itemId) => {
    if (!auth?.user) {
      setError('You must be logged in to modify cart');
      return;
    }

    setLoading(true);
    try {
      const api = getApi();
      await api.delete(`cart/remove/${itemId}/`);

      // Optimistic update: Remove the item from the cart
      setCartItems((prev) => prev.filter((item) => item.id !== itemId));
    } catch (err) {
      console.error('Error removing item from cart:', err);
      setError(
        err.response?.data?.message || 'Failed to remove item from cart',
      );
    } finally {
      setLoading(false);
    }
  };

  // Clear the entire cart (frontend-only, no API call)
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
