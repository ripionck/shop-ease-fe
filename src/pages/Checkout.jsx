import { useState } from 'react';
import { Lock } from 'lucide-react';
import { ConfirmationModal } from '../components/ConfirmationModal';

const products = [
  {
    id: '1',
    name: 'Wireless Headphones Pro',
    color: 'Black',
    price: 299.99,
    image:
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-02%20152407-SdBii2gxAyS6AxvLyNcmL43pZnXS40.png',
    quantity: 1,
  },
  {
    id: '2',
    name: 'Premium Laptop',
    color: 'Silver',
    price: 1299.99,
    image:
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-02%20152407-SdBii2gxAyS6AxvLyNcmL43pZnXS40.png',
    quantity: 1,
  },
];

export default function Checkout() {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const subtotal = products.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const shipping = 9.99;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-medium mb-6">Shipping Address</h2>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="w-full border rounded-md px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="w-full border rounded-md px-3 py-2"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <input
                  type="text"
                  className="w-full border rounded-md px-3 py-2"
                />
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    className="w-full border rounded-md px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ZIP Code
                  </label>
                  <input
                    type="text"
                    className="w-full border rounded-md px-3 py-2"
                  />
                </div>
              </div>

              <h2 className="text-xl font-medium mt-8 mb-6">Payment Method</h2>

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="payment"
                    id="credit-card"
                    checked
                    readOnly
                  />
                  <label htmlFor="credit-card">Credit Card</label>
                  <div className="flex gap-2 ml-4">
                    <div className="w-8 h-5 bg-gray-200 rounded"></div>
                    <div className="w-8 h-5 bg-gray-200 rounded"></div>
                    <div className="w-8 h-5 bg-gray-200 rounded"></div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Card Number
                  </label>
                  <input
                    type="text"
                    placeholder="0000 0000 0000 0000"
                    className="w-full border rounded-md px-3 py-2"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Expiration Date
                    </label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="w-full border rounded-md px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      CVV
                    </label>
                    <input
                      type="text"
                      placeholder="123"
                      className="w-full border rounded-md px-3 py-2"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Order Summary
              </h2>

              <div className="space-y-4">
                {products.map((product) => (
                  <div key={product.id} className="flex gap-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-md flex items-center justify-center">
                      <img
                        src={product.image || '/placeholder.svg'}
                        alt={product.name}
                        className="w-10 h-10 object-contain"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-medium">{product.name}</h3>
                      <p className="text-sm text-gray-500">
                        Qty: {product.quantity}
                      </p>
                    </div>
                    <div className="text-sm font-medium">
                      ${product.price.toFixed(2)}
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
                  <div className="flex justify-between font-medium pt-2 border-t">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  onClick={() => setShowConfirmation(true)}
                  className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 flex items-center justify-center gap-2"
                >
                  <Lock className="w-4 h-4" />
                  Place Order
                </button>

                <p className="text-center text-sm text-gray-500 flex items-center justify-center gap-1">
                  <Lock className="w-4 h-4" />
                  Secure checkout powered by Stripe
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Order Confirmation Modal */}
      {showConfirmation && (
        <ConfirmationModal
          isOpen={showConfirmation}
          onClose={() => setShowConfirmation(false)}
          orderDetails={{
            number: '123456',
            total: total.toFixed(2),
          }}
        />
      )}
    </div>
  );
}
