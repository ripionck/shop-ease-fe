import { useState, useEffect } from 'react';
import {
  Search,
  ChevronRight,
  ChevronLeft,
  Grid,
  List,
  Heart,
  ShoppingCart,
  Star,
} from 'lucide-react';
import allproducts from '../data/products';

// Dummy data for categories
const categories = [
  { name: 'Electronics', count: 45 },
  { name: 'Fashion', count: 32 },
  { name: 'Home & Living', count: 28 },
  { name: 'Beauty', count: 15 },
];

// Dummy data for products
// const allProducts = Array(20)
//   .fill(null)
//   .map((_, i) => ({
//     id: i + 1,
//     name: `Product ${i + 1}`,
//     description: 'Lorem ipsum dolor sit amet',
//     price: Math.floor(Math.random() * 1000) + 99.99,
//     rating: Math.floor(Math.random() * 5) + 1,
//     reviews: Math.floor(Math.random() * 500) + 1,
//     image: '/placeholder.svg',
//     category: categories[Math.floor(Math.random() * categories.length)].name,
//   }));

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

export default function Products() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('featured');
  const [products, setProducts] = useState(allproducts);

  useEffect(() => {
    let filteredProducts = products;

    // Apply search filter
    if (searchTerm) {
      filteredProducts = filteredProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    // Apply category filter
    if (selectedCategories.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        selectedCategories.includes(product.category),
      );
    }

    // Apply rating filter
    if (selectedRatings.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        selectedRatings.includes(Math.floor(product.rating)),
      );
    }

    // Apply price range filter
    filteredProducts = filteredProducts.filter(
      (product) =>
        product.price >= priceRange[0] && product.price <= priceRange[1],
    );

    // Apply sorting
    switch (sortBy) {
      case 'price-low-high':
        filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-high-low':
        filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filteredProducts.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // 'featured' - no sorting needed
        break;
    }

    setProducts(filteredProducts);
  }, [searchTerm, selectedCategories, selectedRatings, priceRange, sortBy]);

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category],
    );
  };

  const handleRatingChange = (rating) => {
    setSelectedRatings((prev) =>
      prev.includes(rating)
        ? prev.filter((r) => r !== rating)
        : [...prev, rating],
    );
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
          Shop
        </a>
        <ChevronRight className="w-4 h-4 text-gray-400" />
        <span className="text-gray-900">All Products</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <aside className="space-y-6">
          {/* Search */}
          <div>
            <h3 className="font-medium mb-4">Search</h3>
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-medium mb-4">Categories</h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <label key={category.name} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category.name)}
                    onChange={() => handleCategoryChange(category.name)}
                    className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="ml-2 text-gray-600">{category.name}</span>
                  <span className="ml-auto text-gray-400">
                    ({category.count})
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <h3 className="font-medium mb-4">Price Range</h3>
            <div className="space-y-4">
              <input
                type="range"
                min="0"
                max="2000"
                value={priceRange[1]}
                onChange={(e) =>
                  setPriceRange([
                    priceRange[0],
                    Number.parseInt(e.target.value),
                  ])
                }
                className="w-full"
              />
              <div className="flex gap-4">
                <input
                  type="number"
                  placeholder="Min"
                  value={priceRange[0]}
                  onChange={(e) =>
                    setPriceRange([
                      Number.parseInt(e.target.value),
                      priceRange[1],
                    ])
                  }
                  className="w-full px-3 py-2 border rounded-lg"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={priceRange[1]}
                  onChange={(e) =>
                    setPriceRange([
                      priceRange[0],
                      Number.parseInt(e.target.value),
                    ])
                  }
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* Ratings */}
          <div>
            <h3 className="font-medium mb-4">Ratings</h3>
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((rating) => (
                <label key={rating} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedRatings.includes(rating)}
                    onChange={() => handleRatingChange(rating)}
                    className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <div className="ml-2">
                    <StarRating rating={rating} reviews={0} />
                  </div>
                </label>
              ))}
            </div>
          </div>

          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCategories([]);
              setSelectedRatings([]);
              setPriceRange([0, 2000]);
            }}
            className="w-full py-2 text-gray-600 border rounded-lg hover:bg-gray-50"
          >
            Clear All Filters
          </button>
        </aside>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {/* Toolbar */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="featured">Sort by: Featured</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
              <span className="text-gray-600">
                Showing {products.length} of {products.length} products
              </span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${
                  viewMode === 'grid' ? 'text-indigo-600' : 'text-gray-600'
                } hover:text-indigo-600`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${
                  viewMode === 'list' ? 'text-indigo-600' : 'text-gray-600'
                } hover:text-indigo-600`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Product Grid/List */}
          <div
            className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                : 'space-y-6'
            }
          >
            {products.map((product) => (
              <div
                key={product.id}
                className={`bg-white rounded-lg shadow-md overflow-hidden ${
                  viewMode === 'list' ? 'flex' : ''
                }`}
              >
                <div
                  className={`relative ${viewMode === 'list' ? 'w-1/3' : ''}`}
                >
                  <img
                    src={product.image || '/placeholder.svg'}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  <button className="absolute top-3 right-3 p-1.5 rounded-full bg-white/80 hover:bg-white">
                    <Heart className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
                <div className={`p-4 ${viewMode === 'list' ? 'w-2/3' : ''}`}>
                  <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-2">
                    {product.description}
                  </p>
                  <StarRating
                    rating={product.rating}
                    reviews={product.reviews}
                  />
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-lg font-bold text-indigo-600">
                      ${product.price.toFixed(2)}
                    </span>
                    <button className="p-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-700">
                      <ShoppingCart className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center gap-2 mt-8">
            <button className="p-2 rounded-lg border hover:bg-gray-50">
              <ChevronLeft className="w-5 h-5" />
            </button>
            {[1, 2, 3, '...', 12].map((page, i) => (
              <button
                key={i}
                className={`px-4 py-2 rounded-lg ${
                  page === 1 ? 'bg-indigo-600 text-white' : 'hover:bg-gray-50'
                }`}
              >
                {page}
              </button>
            ))}
            <button className="p-2 rounded-lg border hover:bg-gray-50">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
