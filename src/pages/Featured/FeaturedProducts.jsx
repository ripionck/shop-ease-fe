import { ChevronRight, Heart, ShoppingCart, Star } from 'lucide-react';

// Dummy product data
const products = [
  {
    id: 1,
    name: 'Wireless Headphones',
    description: 'Premium Sound Quality',
    price: 79.99,
    originalPrice: 99.99,
    rating: 4,
    reviews: 124,
    discount: '-20%',
    image: '/placeholder.svg',
    isNew: false,
    isHot: false,
  },
  {
    id: 2,
    name: 'Ultra Laptop Pro',
    description: 'Latest Generation',
    price: 1299.99,
    rating: 5,
    reviews: 89,
    isNew: true,
    isHot: false,
    image: '/placeholder.svg',
  },
  {
    id: 3,
    name: 'Smart Phone X',
    description: '5G Ready',
    price: 899.99,
    rating: 4.5,
    reviews: 246,
    isNew: false,
    isHot: false,
    image: '/placeholder.svg',
  },
  {
    id: 4,
    name: 'Smart Watch Pro',
    description: 'Fitness Tracker',
    price: 199.99,
    originalPrice: 249.99,
    rating: 4,
    reviews: 167,
    isNew: false,
    isHot: true,
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

export default function FeaturedProducts() {
  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Featured Products</h2>
        <p className="text-gray-600">
          Discover our handpicked selection of trending products that combine
          style, quality, and value.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div className="relative">
              <img
                src={product.image || '/placeholder.svg'}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <button className="absolute top-3 right-3 p-1.5 rounded-full bg-white/80 hover:bg-white">
                <Heart className="w-5 h-5 text-gray-600" />
              </button>
              {product.discount && (
                <span className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 text-sm rounded">
                  {product.discount}
                </span>
              )}
              {product.isNew && (
                <span className="absolute top-3 left-3 bg-green-500 text-white px-2 py-1 text-sm rounded">
                  New
                </span>
              )}
              {product.isHot && (
                <span className="absolute top-3 left-3 bg-orange-500 text-white px-2 py-1 text-sm rounded">
                  Hot
                </span>
              )}
            </div>

            <div className="p-4">
              <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
              <p className="text-gray-600 text-sm mb-2">
                {product.description}
              </p>
              <StarRating rating={product.rating} reviews={product.reviews} />

              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-indigo-600">
                    ${product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-500 line-through">
                      ${product.originalPrice}
                    </span>
                  )}
                </div>
                <button className="p-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-700">
                  <ShoppingCart className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-8">
        <button className="inline-flex items-center gap-1 px-6 py-3 rounded-full bg-indigo-600 text-white hover:bg-indigo-700">
          View All Products
          <ChevronRight />
        </button>
      </div>
    </section>
  );
}
