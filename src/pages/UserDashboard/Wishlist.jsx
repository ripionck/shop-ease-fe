import { Trash2, ShoppingCart } from 'lucide-react';

// Dummy wishlist data
const wishlistItems = [
  {
    id: 1,
    name: 'Wireless Headphones',
    price: 299.99,
    image: '🎧',
    inStock: true,
  },
  {
    id: 2,
    name: 'Premium Laptop',
    price: 1299.99,
    image: '💻',
    inStock: true,
  },
  {
    id: 3,
    name: 'Smartphone Pro',
    price: 899.99,
    image: '📱',
    inStock: false,
  },
];

export default function Wishlist() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Wishlist</h1>
        <span className="text-gray-500">{wishlistItems.length} items</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlistItems.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-end mb-4">
              <button className="text-red-500 hover:text-red-600">
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
            <div className="text-4xl mb-4 text-center">{item.image}</div>
            <h3 className="font-semibold mb-2">{item.name}</h3>
            <p className="text-gray-600 mb-4">${item.price}</p>
            <div className="flex justify-between items-center">
              <span
                className={`text-sm ${
                  item.inStock ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {item.inStock ? 'In Stock' : 'Out of Stock'}
              </span>
              <button
                className={`flex items-center px-4 py-2 rounded-lg text-sm
                  ${
                    item.inStock
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                disabled={!item.inStock}
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
