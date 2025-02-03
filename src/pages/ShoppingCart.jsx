import { useState } from 'react';
import { Minus, Plus, Trash2, Lock } from 'lucide-react';
const initialProducts = [
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

export default function ShoppingCart() {
  const [products, setProducts] = useState(initialProducts);
  const [promoCode, setPromoCode] = useState('');

  const subtotal = products.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const shipping = 9.99;
  const total = subtotal + shipping;

  const updateQuantity = (id, delta) => {
    setProducts(
      products.map((product) => {
        if (product.id === id) {
          const newQuantity = Math.max(1, product.quantity + delta);
          return { ...product, quantity: newQuantity };
        }
        return product;
      }),
    );
  };

  const removeItem = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-lg shadow p-6 flex items-center gap-6"
                >
                  <div className="w-24 h-24 bg-gray-100 rounded-md flex items-center justify-center">
                    <img
                      src={product.image || '/placeholder.svg'}
                      alt={product.name}
                      className="w-16 h-16 object-contain"
                    />
                  </div>

                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-900">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Color: {product.color}
                    </p>

                    <div className="mt-4 flex items-center gap-4">
                      <div className="flex items-center border rounded-md">
                        <button
                          onClick={() => updateQuantity(product.id, -1)}
                          className="p-2 hover:bg-gray-50"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="px-4">{product.quantity}</span>
                        <button
                          onClick={() => updateQuantity(product.id, 1)}
                          className="p-2 hover:bg-gray-50"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(product.id)}
                        className="text-red-500 hover:text-red-600"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  <div className="text-lg font-medium">
                    ${product.price.toFixed(2)}
                  </div>
                </div>
              ))}
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

                <button className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 flex items-center justify-center gap-2">
                  <Lock className="w-4 h-4" />
                  Proceed to Checkout
                </button>

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
