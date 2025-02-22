import { Heart, Minus, Plus, RefreshCw, Star, Truck } from 'lucide-react';
import PropTypes from 'prop-types';

const ProductInfo = ({
  product,
  loading,
  quantity,
  setQuantity,
  handleAddToCart,
}) => {
  return (
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
        <div className="flex items-center gap-2">
          <span className="text-3xl font-bold text-indigo-600">
            ${parseFloat(product.price).toFixed(2)}
          </span>
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
        {product.discounted_price && (
          <div className="flex items-center gap-2">
            <span className="text-lg text-gray-500 line-through">
              ${parseFloat(product.discounted_price).toFixed(2)}
            </span>
          </div>
        )}
      </div>

      <p className="text-gray-600">{product.description}</p>

      <div>
        <h3 className="font-medium mb-3">Availability</h3>
        <span className="text-sm text-gray-500">
          {product.stock_quantity > 0
            ? `Only ${product.stock_quantity} items left!`
            : 'Out of stock'}
        </span>
      </div>

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

      <div className="flex gap-4">
        <button
          onClick={handleAddToCart}
          disabled={loading}
          className="flex-1 py-3 bg-indigo-600 text-white rounded-lg cursor-pointer hover:bg-indigo-700"
        >
          Add to Cart
        </button>
        <button className="p-3 rounded-lg border hover:bg-gray-50">
          <Heart className="w-6 h-6" />
        </button>
      </div>

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
  );
};

ProductInfo.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string.isRequired,
    rating: PropTypes.number,
    price: PropTypes.string.isRequired,
    discounted_price: PropTypes.string,
    description: PropTypes.string.isRequired,
    stock_quantity: PropTypes.number.isRequired,
  }).isRequired,
  loading: PropTypes.bool,
  quantity: PropTypes.number.isRequired,
  setQuantity: PropTypes.func.isRequired,
  handleAddToCart: PropTypes.func.isRequired,
};

export default ProductInfo;
