import { Search, Star } from 'lucide-react';
import PropTypes from 'prop-types';

const ProductFilters = ({
  searchTerm,
  categories,
  selectedCategories,
  priceRange,
  selectedRatings,
  onSearchChange,
  onCategoryChange,
  onPriceChange,
  onRatingChange,
  onClearFilters,
}) => {
  return (
    <aside className="space-y-6">
      {/* Search Filter */}
      <div>
        <h3 className="font-medium mb-4">Search</h3>
        <div className="relative">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
        </div>
      </div>

      {/* Categories Filter */}
      <div>
        <h3 className="font-medium mb-4">Categories</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <label key={category.id} className="flex items-center">
              <input
                type="checkbox"
                checked={selectedCategories.includes(category.name)}
                onChange={() => onCategoryChange(category.name)}
                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="ml-2 text-gray-600">{category.name}</span>
              <span className="ml-auto text-gray-400">
                ({category.totalProducts || 0})
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Filter */}
      <div>
        <h3 className="font-medium mb-4">Price Range</h3>
        <div className="space-y-4">
          <input
            type="range"
            min="0"
            max="2000"
            value={priceRange[1]}
            onChange={(e) =>
              onPriceChange([priceRange[0], Number(e.target.value)])
            }
            className="w-full"
          />
          <div className="flex gap-4">
            <input
              type="number"
              placeholder="Min"
              value={priceRange[0]}
              onChange={(e) =>
                onPriceChange([Number(e.target.value), priceRange[1]])
              }
              className="w-full px-3 py-2 border rounded-lg"
            />
            <input
              type="number"
              placeholder="Max"
              value={priceRange[1]}
              onChange={(e) =>
                onPriceChange([priceRange[0], Number(e.target.value)])
              }
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
        </div>
      </div>

      {/* Ratings Filter */}
      <div>
        <h3 className="font-medium mb-4">Ratings</h3>
        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map((rating) => (
            <label key={rating} className="flex items-center">
              <input
                type="checkbox"
                checked={selectedRatings.includes(rating)}
                onChange={() => onRatingChange(rating)}
                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <div className="ml-2 flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < rating
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
            </label>
          ))}
        </div>
      </div>

      <button
        onClick={onClearFilters}
        className="w-full py-2 text-gray-600 border rounded-lg hover:bg-gray-50"
      >
        Clear All Filters
      </button>
    </aside>
  );
};

ProductFilters.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      products_count: PropTypes.number,
    }),
  ).isRequired,
  selectedCategories: PropTypes.arrayOf(PropTypes.string).isRequired,
  priceRange: PropTypes.arrayOf(PropTypes.number).isRequired,
  selectedRatings: PropTypes.arrayOf(PropTypes.number).isRequired,
  onSearchChange: PropTypes.func.isRequired,
  onCategoryChange: PropTypes.func.isRequired,
  onPriceChange: PropTypes.func.isRequired,
  onRatingChange: PropTypes.func.isRequired,
  onClearFilters: PropTypes.func.isRequired,
};

export default ProductFilters;
