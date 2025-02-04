import { useState } from 'react';
import {
  ChevronRight,
  Heart,
  Minus,
  Plus,
  RefreshCw,
  Truck,
  Star,
  ThumbsUp,
  ThumbsDown,
  MessageCircle,
} from 'lucide-react';

const product = {
  name: 'Wireless Headphones Pro',
  price: 299.99,
  originalPrice: 399.99,
  discount: '25%',
  rating: 4,
  // reviews: 128,
  description:
    'Experience premium sound quality with our latest Wireless Headphones Pro. Features include active noise cancellation, 40-hour battery life, and premium comfort design.',
  features: [
    'Active Noise Cancellation Technology',
    '40-hour Battery Life',
    'Premium Memory Foam Ear Cushions',
  ],
  specifications: {
    'Driver Size': '40mm',
    'Frequency Response': '20Hz - 20kHz',
    Impedance: '32 Ohm',
    'Battery Capacity': '800mAh',
    'Charging Time': '2 hours',
    'Bluetooth Version': '5.0',
    Range: '10m',
  },
  colors: ['black', 'indigo'],
  images: Array(4).fill('/placeholder.svg'),
  stock: 12,
  reviews: [
    {
      id: 1,
      user: 'Sarah M.',
      rating: 5,
      date: 'March 15, 2024',
      comment: "Best headphones I've ever owned! The sound quality is amazing.",
      helpful: 24,
      notHelpful: 2,
    },
    {
      id: 2,
      user: 'Mike R.',
      rating: 4,
      date: 'March 10, 2024',
      comment:
        'Great battery life and comfortable fit. Could use more bass though.',
      helpful: 15,
      notHelpful: 1,
    },
  ],
};

const StarRating = ({ rating, reviews, size = 'small' }) => {
  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`${size === 'small' ? 'w-4 h-4' : 'w-5 h-5'} ${
            i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
          }`}
        />
      ))}
      {reviews !== undefined && (
        <span className="text-sm text-gray-500">({reviews} reviews)</span>
      )}
    </div>
  );
};

export default function ProductDetail() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState('black');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'description':
        return (
          <div className="py-6">
            <h3 className="font-bold text-lg mb-4">Product Description</h3>
            <p className="text-gray-600 mb-6">{product.description}</p>
            <ul className="space-y-2">
              {product.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        );

      case 'specifications':
        return (
          <div className="py-6">
            <h3 className="font-bold text-lg mb-4">Technical Specifications</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="flex justify-between border-b pb-2">
                  <span className="text-gray-600">{key}</span>
                  <span className="font-medium">{value}</span>
                </div>
              ))}
            </div>
          </div>
        );

      case 'reviews':
        return (
          <div className="py-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-lg">Customer Reviews</h3>
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                Write a Review
              </button>
            </div>

            {/* Overall Rating */}
            <div className="bg-gray-50 p-6 rounded-lg mb-8">
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="text-5xl font-bold text-gray-900">4.8</div>
                  <StarRating rating={4.8} size="large" />
                  <p className="text-sm text-gray-600 mt-1">
                    Based on {product.reviews.length} reviews
                  </p>
                </div>
                <div className="flex-1 space-y-2">
                  {[5, 4, 3, 2, 1].map((stars) => (
                    <div key={stars} className="flex items-center gap-2">
                      <div className="text-sm text-gray-600 w-6">{stars}</div>
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-yellow-400"
                          style={{
                            width: `${
                              (product.reviews.filter(
                                (r) => Math.floor(r.rating) === stars,
                              ).length /
                                product.reviews.length) *
                              100
                            }%`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Review List */}
            <div className="space-y-6">
              {product.reviews.map((review) => (
                <div key={review.id} className="border-b pb-6">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="font-medium">{review.user}</p>
                      <StarRating rating={review.rating} />
                    </div>
                    <span className="text-sm text-gray-600">{review.date}</span>
                  </div>
                  <p className="text-gray-600 mb-4">{review.comment}</p>
                  <div className="flex items-center gap-4">
                    <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900">
                      <ThumbsUp className="w-4 h-4" />
                      <span>Helpful ({review.helpful})</span>
                    </button>
                    <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900">
                      <ThumbsDown className="w-4 h-4" />
                      <span>Not Helpful ({review.notHelpful})</span>
                    </button>
                    <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900">
                      <MessageCircle className="w-4 h-4" />
                      <span>Reply</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm mb-8">
        <a href="#" className="text-gray-600 hover:text-gray-900">
          Home
        </a>
        <ChevronRight className="w-4 h-4 text-gray-400" />
        <a href="#" className="text-gray-600 hover:text-gray-900">
          Electronics
        </a>
        <ChevronRight className="w-4 h-4 text-gray-400" />
        <span className="text-gray-900">Wireless Headphones Pro</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
            <img
              src={product.images[selectedImage] || '/placeholder.svg'}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {product.images.map((image, i) => (
              <button
                key={i}
                onClick={() => setSelectedImage(i)}
                className={`aspect-square rounded-lg overflow-hidden bg-gray-100 ${
                  selectedImage === i ? 'ring-2 ring-indigo-600' : ''
                }`}
              >
                <img
                  src={image || '/placeholder.svg'}
                  alt={`Product view ${i + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <StarRating
              rating={product.rating}
              reviews={product.reviews.length}
            />
          </div>

          <div className="flex items-center gap-4">
            <span className="text-3xl font-bold text-indigo-600">
              ${product.price}
            </span>
            <span className="text-lg text-gray-500 line-through">
              ${product.originalPrice}
            </span>
            <span className="px-2 py-1 text-sm text-red-600 bg-red-100 rounded">
              Save {product.discount}
            </span>
          </div>

          <p className="text-gray-600">{product.description}</p>

          {/* Color Selection */}
          <div>
            <h3 className="font-medium mb-3">Color</h3>
            <div className="flex gap-3">
              {product.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`w-8 h-8 rounded-full ${
                    color === 'black' ? 'bg-gray-900' : 'bg-indigo-600'
                  } ${
                    selectedColor === color
                      ? 'ring-2 ring-offset-2 ring-gray-900'
                      : ''
                  }`}
                >
                  <span className="sr-only">{color}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div>
            <h3 className="font-medium mb-3">Quantity</h3>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="p-2 rounded-lg border hover:bg-gray-50"
              >
                <Minus className="w-5 h-5" />
              </button>
              <span className="w-12 text-center">{quantity}</span>
              <button
                onClick={() =>
                  setQuantity((q) => Math.min(product.stock, q + 1))
                }
                className="p-2 rounded-lg border hover:bg-gray-50"
              >
                <Plus className="w-5 h-5" />
              </button>
              <span className="text-sm text-gray-500">
                Only {product.stock} items left!
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <button className="flex-1 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
              Add to Cart
            </button>
            <button className="p-3 rounded-lg border hover:bg-gray-50">
              <Heart className="w-6 h-6" />
            </button>
          </div>

          {/* Delivery Info */}
          <div className="border-t pt-6 space-y-4">
            <div className="flex items-center gap-3">
              <Truck className="w-5 h-5 text-gray-600" />
              <div>
                <h4 className="font-medium">Free Delivery</h4>
                <p className="text-sm text-gray-600">
                  Enter your postal code for delivery availability
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <RefreshCw className="w-5 h-5 text-gray-600" />
              <div>
                <h4 className="font-medium">30 Days Return</h4>
                <p className="text-sm text-gray-600">
                  Shop with confidence with our 30-day return policy
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Tabs */}
      <div className="mt-16">
        <div className="border-b">
          <nav className="flex gap-8">
            <button
              onClick={() => setActiveTab('description')}
              className={`py-4 ${
                activeTab === 'description'
                  ? 'border-b-2 border-indigo-600 font-medium text-indigo-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Description
            </button>
            <button
              onClick={() => setActiveTab('specifications')}
              className={`py-4 ${
                activeTab === 'specifications'
                  ? 'border-b-2 border-indigo-600 font-medium text-indigo-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Specifications
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`py-4 ${
                activeTab === 'reviews'
                  ? 'border-b-2 border-indigo-600 font-medium text-indigo-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Reviews ({product.reviews.length})
            </button>
          </nav>
        </div>
        {renderTabContent()}
      </div>
    </div>
  );
}
