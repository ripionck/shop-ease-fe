import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ConfirmationModal } from '../components/ConfirmationModal';
import Spinner from '../components/Spinner';
import useCart from '../hooks/useCart';

const getAccessToken = () => localStorage.getItem('access_token');

const api = axios.create({
  baseURL: 'https://shop-ease-3oxf.onrender.com/api/v1/',
  headers: {
    Authorization: `Bearer ${getAccessToken()}`,
  },
});

export default function Checkout() {
  const navigate = useNavigate();
  const { cartItems, loading, error } = useCart();
  const [formLoading, setFormLoading] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    country: '',
    zipCode: '',
    cardNumber: '',
    cardName: '',
    cardExpiry: '',
    cardCVC: '',
    saveCard: false,
  });

  // Handle form input
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  // Handle errors
  const handleError = (err) => {
    if (err.response?.status === 401) {
      navigate('/login');
    } else {
      toast.error(err.response?.data?.message || 'An error occurred');
    }
  };

  // Handle checkout
  const handleCheckout = async (e) => {
    e.preventDefault();

    try {
      setFormLoading(true);

      // 1. Create Order
      const orderResponse = await api.post('/orders/create/', {
        shipping_address: {
          first_name: formData.firstName,
          last_name: formData.lastName,
          street_address: formData.address,
          city: formData.city,
          state: formData.state,
          country: formData.country,
          zip_code: formData.zipCode,
        },
        payment_details: {
          card_number: formData.cardNumber,
          card_name: formData.cardName,
          card_expiry: formData.cardExpiry,
          card_cvc: formData.cardCVC,
        },
      });

      // 2. Show Confirmation (Skip clearing cart if API is not available)
      setOrderDetails(orderResponse.data);
      setShowConfirmation(true);
      toast.success('Order placed successfully!');
    } catch (err) {
      handleError(err);
    } finally {
      setFormLoading(false);
    }
  };

  // Calculate totals
  const subtotal = cartItems.reduce(
    (sum, item) => sum + parseFloat(item.price) * item.quantity,
    0,
  );
  const shipping = 9.99;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div className="flex-1">
              <div className="h-2 bg-indigo-600 rounded-full"></div>
            </div>
            <div className="ml-4 text-sm font-medium">
              Step 1 of 1: Checkout
            </div>
          </div>
        </div>

        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <form onSubmit={handleCheckout}>
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

                {/* Credit Card Form */}
                <div className="mt-8">
                  <h2 className="text-xl font-medium">Payment Details</h2>
                  <div className="mt-4 space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Card Number *
                      </label>
                      <input
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        className="w-full border rounded-md px-3 py-2"
                        placeholder="1234 5678 9012 3456"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Name on Card *
                      </label>
                      <input
                        name="cardName"
                        value={formData.cardName}
                        onChange={handleInputChange}
                        className="w-full border rounded-md px-3 py-2"
                        placeholder="John Doe"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Expiry Date *
                        </label>
                        <input
                          name="cardExpiry"
                          value={formData.cardExpiry}
                          onChange={handleInputChange}
                          className="w-full border rounded-md px-3 py-2"
                          placeholder="MM / YY"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          CVC Code *
                        </label>
                        <input
                          name="cardCVC"
                          value={formData.cardCVC}
                          onChange={handleInputChange}
                          className="w-full border rounded-md px-3 py-2"
                          placeholder="123"
                          required
                        />
                      </div>
                    </div>

                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        name="saveCard"
                        checked={formData.saveCard}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <label className="text-sm text-gray-600">
                        Save Credit Card details for future use
                      </label>
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
                          src={item.image}
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
                        ${(parseFloat(item.price) * item.quantity).toFixed(2)}
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
                      <>Place Order</>
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
              number: orderDetails.id,
              total: orderDetails.total_amount,
              date: new Date(orderDetails.created_at).toLocaleDateString(),
            }}
          />
        )}
      </div>
    </div>
  );
}
