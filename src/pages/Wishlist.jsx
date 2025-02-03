import { Heart, Facebook, Twitter, Link2, Star } from 'lucide-react';

// Dummy wishlist data
const wishlistItems = [
  {
    id: 1,
    name: 'Wireless Headphones Pro',
    description: 'Premium Sound Quality',
    price: 299.99,
    originalPrice: 399.99,
    rating: 4,
    reviews: 124,
    inStock: true,
    image: '/placeholder.svg',
  },
  {
    id: 2,
    name: 'Premium Laptop',
    description: 'Ultra Performance',
    price: 1299.99,
    rating: 5,
    reviews: 89,
    inStock: false,
    image: '/placeholder.svg',
  },
  {
    id: 3,
    name: 'Smartphone Pro',
    description: 'Next-Gen Technology',
    price: 899.99,
    originalPrice: 999.99,
    rating: 4.5,
    reviews: 246,
    inStock: true,
    image: '/placeholder.svg',
  },
];

const StarRating = ({ rating, reviews }) => {
  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
          }`}
        />
      ))}
      <span className="text-sm text-gray-500">({reviews})</span>
    </div>
  );
};

export default function Wishlist() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">My Wishlist</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {wishlistItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg shadow-sm overflow-hidden"
          >
            <div className="relative">
              <img
                src={item.image || '/placeholder.svg'}
                alt={item.name}
                className="w-full h-48 object-cover"
              />
              <button className="absolute top-3 right-3 p-1.5 rounded-full bg-white/80 hover:bg-white">
                <Heart className="w-5 h-5 fill-red-500 text-red-500" />
              </button>
              {item.inStock ? (
                <span className="absolute top-3 left-3 bg-green-500 text-white px-2 py-1 text-sm rounded">
                  In Stock
                </span>
              ) : (
                <span className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 text-sm rounded">
                  Out of Stock
                </span>
              )}
            </div>

            <div className="p-4">
              <h3 className="font-semibold text-lg mb-1">{item.name}</h3>
              <p className="text-gray-600 text-sm mb-2">{item.description}</p>
              <StarRating rating={item.rating} reviews={item.reviews} />

              <div className="mt-4 mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-indigo-600">
                    ${item.price}
                  </span>
                  {item.originalPrice && (
                    <span className="text-sm text-gray-500 line-through">
                      ${item.originalPrice}
                    </span>
                  )}
                </div>
              </div>

              {item.inStock ? (
                <button className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                  Add to Cart
                </button>
              ) : (
                <button className="w-full py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200">
                  Notify When Available
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Share Section */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="font-semibold mb-2">Share Your Wishlist</h2>
        <p className="text-gray-600 text-sm mb-4">
          Let others know what you&apos;re wishing for!
        </p>
        <div className="flex gap-2">
          <button className="p-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">
            <Facebook className="w-5 h-5" />
          </button>
          <button className="p-2 rounded-lg bg-blue-400 text-white hover:bg-blue-500">
            <Twitter className="w-5 h-5" />
          </button>
          <button className="p-2 rounded-lg bg-green-500 text-white hover:bg-green-600">
            <Link2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
