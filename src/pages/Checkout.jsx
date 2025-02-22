import axios from 'axios';
import { Lock } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { ConfirmationModal } from '../components/ConfirmationModal';
import Spinner from '../components/Spinner';

export default function Checkout() {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    country: '',
    zipCode: '',
    cardNumber: '',
    expDate: '',
    cvv: '',
  });

  // Get access token
  const getAccessToken = () => localStorage.getItem('access_token');

  // Handle unauthorized
  const handleUnauthorized = () => {
    localStorage.removeItem('access_token');
    window.location.href = '/login';
  };

  // Fetch cart items
  const fetchCart = async () => {
    try {
      const { data } = await axios.get('http://127.0.0.1:8000/api/v1/cart/', {
        headers: { Authorization: `Bearer ${getAccessToken()}` },
      });
      setCartItems(data.cart.products || []);
    } catch (error) {
      if (error.response?.status === 401) handleUnauthorized();
      else toast.error('Failed to load cart');
    } finally {
      setLoading(false);
    }
  };

  // Handle form input
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validate form
  const validateForm = () => {
    const requiredFields = [
      'firstName',
      'lastName',
      'address',
      'city',
      'state',
      'country',
      'zipCode',
    ];
    return requiredFields.every((field) => formData[field].trim());
  };

  // Process payment
  const processPayment = async (orderId, amount) => {
    try {
      const paymentPayload = {
        order: orderId,
        amount: amount.toFixed(2),
        payment_method: 'credit_card',
      };

      await axios.post(
        'http://127.0.0.1:8000/api/v1/payments/',
        paymentPayload,
        { headers: { Authorization: `Bearer ${getAccessToken()}` } },
      );
    } catch (error) {
      throw new Error(
        error.response?.data?.message || 'Payment processing failed',
      );
    }
  };

  // Submit order
  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!validateForm()) return toast.error('Please fill all required fields');

    try {
      setFormLoading(true);

      // Step 1: Create order
      const orderPayload = {
        shipping_address: {
          first_name: formData.firstName,
          last_name: formData.lastName,
          street_address: formData.address,
          city: formData.city,
          state: formData.state,
          country: formData.country,
          zip_code: formData.zipCode,
        },
        payment_method: 'credit_card',
      };

      const { data: order } = await axios.post(
        'http://127.0.0.1:8000/api/v1/orders/create/',
        orderPayload,
        { headers: { Authorization: `Bearer ${getAccessToken()}` } },
      );

      // Step 2: Process payment
      await processPayment(order.id, order.total_amount);

      // Step 3: Clear cart
      await axios.delete('http://127.0.0.1:8000/api/v1/cart/clear/', {
        headers: { Authorization: `Bearer ${getAccessToken()}` },
      });

      setOrderDetails(order);
      setShowConfirmation(true);
      toast.success('Order placed successfully!');
    } catch (error) {
      toast.error(error.message || 'Order failed');
      if (error.response?.status === 401) handleUnauthorized();
    } finally {
      setFormLoading(false);
    }
  };

  // Calculate totals
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const shipping = 9.99;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  useEffect(() => {
    if (!getAccessToken()) window.location.href = '/login';
    else fetchCart();
  }, []);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center">
            <div className="flex items-center">
              <div className="bg-indigo-600 rounded-full h-8 w-8 flex items-center justify-center text-white">
                1
              </div>
              <div className="h-1 w-24 bg-indigo-600"></div>
              <div className="bg-indigo-600 rounded-full h-8 w-8 flex items-center justify-center text-white">
                2
              </div>
              <div className="h-1 w-24 bg-gray-200"></div>
              <div className="border-2 border-gray-200 rounded-full h-8 w-8 flex items-center justify-center text-gray-400">
                3
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handlePlaceOrder}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Shipping Address Section */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow p-6 space-y-6">
                <h2 className="text-xl font-medium">Shipping Address</h2>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      First Name *
                    </label>
                    <input
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full border rounded-md px-3 py-2"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Last Name *
                    </label>
                    <input
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full border rounded-md px-3 py-2"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Address *
                  </label>
                  <input
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full border rounded-md px-3 py-2"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      City *
                    </label>
                    <input
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full border rounded-md px-3 py-2"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      ZIP Code *
                    </label>
                    <input
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      className="w-full border rounded-md px-3 py-2"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      State *
                    </label>
                    <input
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="w-full border rounded-md px-3 py-2"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Country *
                    </label>
                    <input
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="w-full border rounded-md px-3 py-2"
                      required
                    />
                  </div>
                </div>

                {/* Payment Section */}
                <h2 className="text-xl font-medium pt-6">Payment Method</h2>

                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <input type="radio" id="credit-card" checked readOnly />
                    <label htmlFor="credit-card">Credit Card</label>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Card Number *
                    </label>
                    <input
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '');
                        const formatted =
                          value.match(/.{1,4}/g)?.join(' ') || '';
                        setFormData({
                          ...formData,
                          cardNumber: formatted.slice(0, 19),
                        });
                      }}
                      placeholder="0000 0000 0000 0000"
                      className="w-full border rounded-md px-3 py-2"
                      maxLength={19}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Expiration (MM/YY) *
                      </label>
                      <input
                        name="expDate"
                        value={formData.expDate}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, '');
                          const formatted = value
                            .replace(/^(\d{2})(\d)/, '$1/$2')
                            .slice(0, 5);
                          setFormData({ ...formData, expDate: formatted });
                        }}
                        placeholder="MM/YY"
                        className="w-full border rounded-md px-3 py-2"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        CVV *
                      </label>
                      <input
                        name="cvv"
                        value={formData.cvv}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, '');
                          setFormData({ ...formData, cvv: value.slice(0, 4) });
                        }}
                        className="w-full border rounded-md px-3 py-2"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-medium mb-4">Order Summary</h2>

                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-4 items-center">
                      <div className="w-16 h-16 bg-gray-100 rounded-md flex items-center justify-center">
                        <img
                          src={item.thumbnail}
                          alt={item.name}
                          className="w-12 h-12 object-contain"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm text-gray-500">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <div className="font-medium">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}

                  <div className="pt-4 border-t space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>${shipping.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-medium pt-2">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={formLoading || cartItems.length === 0}
                    className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {formLoading ? (
                      <span className="animate-pulse">Processing...</span>
                    ) : (
                      <>
                        <Lock className="w-4 h-4" />
                        Place Order
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>

        {/* Confirmation Modal */}
        {orderDetails && (
          <ConfirmationModal
            isOpen={showConfirmation}
            onClose={() => setShowConfirmation(false)}
            orderDetails={{
              number: orderDetails.order_number,
              total: orderDetails.total_amount,
              date: new Date(orderDetails.created_at).toLocaleDateString(),
            }}
          />
        )}
      </div>
    </div>
  );
}
