import axios from 'axios';
import { ShoppingCart, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export default function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState([]);

  const token = localStorage.getItem('access_token');

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await axios.get(
          'http://127.0.0.1:8000/api/v1/wishlist/',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        setWishlistItems(response.data.products);
      } catch (error) {
        console.error('Error fetching wishlist:', error);
      }
    };

    fetchWishlist();
  }, [token]);

  // Remove item from wishlist
  const handleRemoveFromWishlist = async (productId) => {
    try {
      await axios.delete(
        `http://127.0.0.1:8000/api/v1/wishlist/remove/${productId}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      // Update UI by filtering out the removed item
      setWishlistItems((prevItems) =>
        prevItems.filter((item) => item.product_id !== productId),
      );
      toast.success('Removed item from wishlist');
    } catch (error) {
      toast.error(error.message || 'Failed to remove item from wishlist');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Wishlist</h1>
        <span className="text-gray-500">{wishlistItems.length} items</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlistItems.map((item) => (
          <div key={item.product_id} className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-end mb-4">
              <button
                onClick={() => handleRemoveFromWishlist(item.product_id)}
                className="text-red-500 hover:text-red-600"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
            {item.image && (
              <img
                src={item.image}
                alt={item.name}
                className="h-40 w-full object-contain mb-4"
              />
            )}
            <h3 className="font-semibold mb-2">{item.name}</h3>
            <p className="text-gray-600 mb-4">${item.price}</p>
            <div className="flex justify-between items-center">
              <span
                className={`text-sm bg-gray-200 px-2 py-0.5 rounded-full ${
                  item.is_active ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {item.is_active ? 'In Stock' : 'Out of Stock'}
              </span>
              <button
                className={`flex items-center px-4 py-2 rounded-lg text-sm
                  ${
                    item.is_active
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                disabled={!item.is_active}
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
