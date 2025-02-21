import axios from 'axios';
import { Lock, Minus, Plus, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [initialLoading, setInitialLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updatingId, setUpdatingId] = useState(null);
  const [error, setError] = useState('');
  const [promoCode, setPromoCode] = useState('');

  // Get access token from localStorage
  const getAccessToken = () => localStorage.getItem('access_token');

  // Handle unauthorized errors
  const handleUnauthorized = () => {
    localStorage.removeItem('access_token');
    window.location.href = '/login';
  };

  // Fetch cart data
  const fetchCart = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/v1/cart/', {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      });
      setCartItems(response.data.cart.products || []);
      setError('');
    } catch (error) {
      if (error.response?.status === 401) {
        handleUnauthorized();
      } else {
        setError('Failed to load cart items');
        toast.error(error.response?.data?.message || 'Error loading cart');
      }
    } finally {
      setInitialLoading(false);
    }
  };

  // Update item quantity
  const handleUpdateQuantity = async (productId, newQuantity) => {
    try {
      setIsUpdating(true);
      setUpdatingId(productId);

      // Optimistic update
      setCartItems((prev) =>
        prev.map((item) =>
          item.id === productId ? { ...item, quantity: newQuantity } : item,
        ),
      );

      await axios.patch(
        `http://127.0.0.1:8000/api/v1/cart/update/${productId}/`,
        { quantity: newQuantity },
        { headers: { Authorization: `Bearer ${getAccessToken()}` } },
      );

      toast.success('Quantity updated successfully');
    } catch (error) {
      if (error.response?.status === 401) {
        handleUnauthorized();
      } else {
        toast.error(error.response?.data?.message || 'Error updating quantity');
        await fetchCart(); // Revert on error
      }
    } finally {
      setIsUpdating(false);
      setUpdatingId(null);
    }
  };

  // Remove item from cart
  const handleRemoveItem = async (productId) => {
    try {
      setIsUpdating(true);
      setUpdatingId(productId);

      // Optimistic update
      setCartItems((prev) => prev.filter((item) => item.id !== productId));

      await axios.delete(
        `http://127.0.0.1:8000/api/v1/cart/remove/${productId}/`,
        { headers: { Authorization: `Bearer ${getAccessToken()}` } },
      );

      toast.success('Item removed from cart');
    } catch (error) {
      if (error.response?.status === 401) {
        handleUnauthorized();
      } else {
        toast.error(error.response?.data?.message || 'Error removing item');
        await fetchCart(); // Revert on error
      }
    } finally {
      setIsUpdating(false);
      setUpdatingId(null);
    }
  };

  // Calculate totals
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const shipping = 9.99;
  const total = subtotal + shipping;

  useEffect(() => {
    if (!getAccessToken()) {
      window.location.href = '/login';
      return;
    }
    fetchCart();
  }, []);

  if (initialLoading) return <Spinner />;

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 flex justify-center items-center">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {cartItems.map((item) => {
                const isItemUpdating = isUpdating && updatingId === item.id;

                return (
                  <div
                    key={item.id}
                    className="bg-white rounded-lg shadow p-6 flex items-center gap-6"
                  >
                    <div className="w-24 h-24 bg-gray-100 rounded-md flex items-center justify-center">
                      <img
                        src={item.thumbnail || '/placeholder.svg'}
                        alt={item.name}
                        className="w-16 h-16 object-contain"
                      />
                    </div>

                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-gray-900">
                        {item.name}
                      </h3>
                      {item.brand && (
                        <p className="text-sm text-gray-500">
                          Brand: {item.brand}
                        </p>
                      )}

                      <div className="mt-4 flex items-center gap-4">
                        <div className="flex items-center border rounded-md">
                          <button
                            onClick={() =>
                              handleUpdateQuantity(
                                item.id,
                                Math.max(1, item.quantity - 1),
                              )
                            }
                            className="p-2 hover:bg-gray-50 w-10 flex items-center justify-center"
                            disabled={isUpdating}
                          >
                            {isItemUpdating ? (
                              <Spinner size="small" />
                            ) : (
                              <Minus className="w-4 h-4" />
                            )}
                          </button>
                          <span className="px-4">{item.quantity}</span>
                          <button
                            onClick={() =>
                              handleUpdateQuantity(item.id, item.quantity + 1)
                            }
                            className="p-2 hover:bg-gray-50 w-10 flex items-center justify-center"
                            disabled={isUpdating}
                          >
                            {isItemUpdating ? (
                              <Spinner size="small" />
                            ) : (
                              <Plus className="w-4 h-4" />
                            )}
                          </button>
                        </div>

                        <button
                          onClick={() => handleRemoveItem(item.id)}
                          className="text-red-500 hover:text-red-600 w-10 flex items-center justify-center"
                          disabled={isUpdating}
                        >
                          {isItemUpdating ? (
                            <Spinner size="small" />
                          ) : (
                            <Trash2 className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="text-lg font-medium">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                );
              })}

              {cartItems.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  Your cart is empty
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Order Summary
              </h2>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>

                <div className="pt-4 border-t">
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <span className="text-sm text-gray-500">Including VAT</span>
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Promo code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1 border rounded-md px-3 py-2"
                  />
                  <button className="bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-800">
                    Apply
                  </button>
                </div>

                <Link
                  to="/checkout"
                  className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 flex items-center justify-center gap-2"
                >
                  <Lock className="w-4 h-4" />
                  Proceed to Checkout
                </Link>

                <div className="text-center text-sm text-gray-500">
                  We accept:
                  <div className="flex justify-center gap-2 mt-2">
                    <div className="w-8 h-5 bg-gray-200 rounded"></div>
                    <div className="w-8 h-5 bg-gray-200 rounded"></div>
                    <div className="w-8 h-5 bg-gray-200 rounded"></div>
                    <div className="w-8 h-5 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
