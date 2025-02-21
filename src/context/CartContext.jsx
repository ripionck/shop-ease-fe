import { createContext } from 'react';

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

export default CartContext;
