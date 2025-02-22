import {
  ChevronRight,
  Heart,
  Minus,
  Plus,
  RefreshCw,
  Star,
  Truck,
} from 'lucide-react';
import PropTypes from 'prop-types';
import { useState } from 'react';

const ProductDetails = ({ product }) => {
  const [selectedImage, setSelectedImage] = useState(0);
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
            <h3 className="text-2xl font-semibold mb-6 border-b pb-2">
              Technical Specifications
            </h3>
            <div className="space-y-4">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div
                  key={key}
                  className="flex items-start justify-between py-3 px-4 even:bg-gray-50 rounded-lg"
                >
                  <div className="flex-1">
                    <span className="text-gray-600 font-medium capitalize">
                      {key.replace(/_/g, ' ')}
                    </span>
                  </div>
                  <div className="flex-1 text-gray-900 font-medium text-right">
                    {typeof value === 'object' ? (
                      <ul className="list-disc pl-4 space-y-1">
                        {Object.entries(value).map(([subKey, subValue]) => (
                          <li key={subKey}>
                            <span className="font-normal">{subKey}: </span>
                            {subValue}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <span>
                        {value}
                        {key.toLowerCase().includes('weight') && 'g'}
                        {key.toLowerCase().includes('battery') && ' battery'}
                        {key.toLowerCase().includes('depth') && ' waterproof'}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Optional: Certification Badges */}
            <div className="mt-8 border-t pt-6">
              <h4 className="text-sm font-semibold text-gray-600 mb-3">
                Certifications & Standards
              </h4>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                  IP68 Rated
                </span>
                <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                  CE Certified
                </span>
                <span className="px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full">
                  FCC Approved
                </span>
              </div>
            </div>
          </div>
        );

      case 'reviews':
        return (
          <div className="py-6">
            <p className="text-gray-600">No reviews available yet.</p>
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
        <span className="text-gray-900">{product.category}</span>
        <ChevronRight className="w-4 h-4 text-gray-400" />
        <span className="text-gray-900">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
            <img
              src={
                product.images[selectedImage]?.image_url || '/placeholder.svg'
              }
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {product.images.map((image, i) => (
              <button
                key={image.id}
                onClick={() => setSelectedImage(i)}
                className={`aspect-square rounded-lg overflow-hidden bg-gray-100 ${
                  selectedImage === i ? 'ring-2 ring-indigo-600' : ''
                }`}
              >
                <img
                  src={image.image_url}
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
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-400" />
              <span className="text-gray-600">
                {product.rating || 'No ratings yet'}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Current Price */}
            <div className="flex items-center gap-2">
              <span className="text-3xl font-bold text-indigo-600">
                ${parseFloat(product.price).toFixed(2)}
              </span>

              {/* Discount Badge */}
              {product.discounted_price && (
                <span className="px-2 py-1 text-sm text-red-600 bg-red-100 rounded">
                  Save{' '}
                  {Math.round(
                    ((parseFloat(product.price) -
                      parseFloat(product.discounted_price)) /
                      parseFloat(product.price)) *
                      100,
                  )}
                  %
                </span>
              )}
            </div>

            {/* Original Price */}
            {product.discounted_price && (
              <div className="flex items-center gap-2">
                <span className="text-lg text-gray-500 line-through">
                  ${parseFloat(product.discounted_price).toFixed(2)}
                </span>
              </div>
            )}
          </div>

          <p className="text-gray-600">{product.description}</p>

          {/* Stock Quantity */}
          <div>
            <h3 className="font-medium mb-3">Availability</h3>
            <span className="text-sm text-gray-500">
              {product.stock_quantity > 0
                ? `Only ${product.stock_quantity} items left!`
                : 'Out of stock'}
            </span>
          </div>

          {/* Quantity Selector */}
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
                  setQuantity((q) => Math.min(product.stock_quantity, q + 1))
                }
                className="p-2 rounded-lg border hover:bg-gray-50"
              >
                <Plus className="w-5 h-5" />
              </button>
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
              Reviews
            </button>
          </nav>
        </div>
        {renderTabContent()}
      </div>
    </div>
  );
};

ProductDetails.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    discounted_price: PropTypes.string,
    brand: PropTypes.string.isRequired,
    stock_quantity: PropTypes.number.isRequired,
    rating: PropTypes.number,
    images: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        image_url: PropTypes.string.isRequired,
        is_main: PropTypes.bool.isRequired,
      }),
    ).isRequired,
    features: PropTypes.arrayOf(PropTypes.string).isRequired,
    specifications: PropTypes.object.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string),
    created_at: PropTypes.string.isRequired,
    updated_at: PropTypes.string.isRequired,
  }).isRequired,
};

export default ProductDetails;
