import { Heart, ShoppingCart, Star } from 'lucide-react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import useCart from '../hooks/useCart';

const ProductCard = ({ product, viewMode, onAddToWishlist }) => {
  const { addToCart, loading } = useCart();

  const handleAddToCart = async () => {
    try {
      const success = await addToCart(product.id, 1);
      if (success) {
        toast.success(`${product.name} added to cart!`);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div
      className={`bg-white rounded-lg shadow-md overflow-hidden ${
        viewMode === 'list' ? 'flex' : ''
      }`}
    >
      <div className={`relative ${viewMode === 'list' ? 'w-1/3' : ''}`}>
        <img
          src={product.image || '/placeholder.svg'}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        <button
          onClick={() => onAddToWishlist(product.id)}
          className="absolute top-3 right-3 p-1.5 rounded-full bg-white/80 hover:bg-white cursor-pointer"
        >
          <Heart className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      <div className={`p-4 ${viewMode === 'list' ? 'w-2/3' : ''}`}>
        <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-2 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < Math.floor(product.rating)
                  ? 'text-yellow-400 fill-current'
                  : 'text-gray-300'
              }`}
            />
          ))}
          <span className="text-sm text-gray-500">
            ({product.reviews} reviews)
          </span>
        </div>

        <div className="flex items-center justify-between mt-2">
          <span className="text-lg font-bold text-indigo-600">
            ${product.price}
          </span>
          <button
            onClick={handleAddToCart}
            disabled={loading}
            className="p-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 cursor-pointer transition-colors disabled:opacity-50"
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    price: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    reviews: PropTypes.number.isRequired,
    image: PropTypes.string,
  }).isRequired,
  viewMode: PropTypes.oneOf(['grid', 'list']).isRequired,
  onAddToWishlist: PropTypes.func.isRequired,
};

export default ProductCard;
