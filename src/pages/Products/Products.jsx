// src/components/Products.js
import axios from 'axios';
import { Grid, List } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Pagination from '../../components/Pagination';
import ProductCard from '../../components/ProductCard';
import ProductFilters from '../../components/ProductFilters';
import Spinner from '../../components/Spinner';
import useAuth from '../../hooks/useAuth';
import useCategories from '../../hooks/useCategories';
import useProducts from '../../hooks/useProducts';

const Products = () => {
  const { categories } = useCategories();
  const { auth } = useAuth();
  const { products, loading, error, fetchProducts } = useProducts();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('featured');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9;

  const totalPages = Math.ceil(products.count / productsPerPage);

  useEffect(() => {
    const params = {
      search: searchTerm,
      category: selectedCategories,
      min_price: priceRange[0],
      max_price: priceRange[1],
      rating: selectedRatings.join(','),
      sort: sortBy,
      page: currentPage,
    };

    fetchProducts(params);
  }, [
    currentPage,
    searchTerm,
    selectedCategories,
    priceRange,
    selectedRatings,
    sortBy,
  ]);

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category],
    );
    setCurrentPage(1);
  };

  const handleRatingChange = (rating) => {
    setSelectedRatings((prev) =>
      prev.includes(rating)
        ? prev.filter((r) => r !== rating)
        : [...prev, rating],
    );
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedCategories([]);
    setSelectedRatings([]);
    setPriceRange([0, 2000]);
    setCurrentPage(1);
  };

  const handleAddToWishlist = async (productId) => {
    if (!auth.accessToken) {
      toast.error('Please log in to use wishlist.');
      return;
    }

    try {
      console.log('Adding to wishlist:', {
        productId,
        accessToken: auth.accessToken,
      });

      const response = await axios.post(
        'http://127.0.0.1:8000/v1/wishlist/add/',
        { product_id: productId },
        { headers: { Authorization: `Bearer ${auth.accessToken}` } },
      );

      console.log('Wishlist response:', response.data);
      toast.success('Added to wishlist!');
    } catch (error) {
      console.error('Error adding to wishlist:', error);

      // Extract and display detailed error message
      const errorMessage =
        error.response?.data?.message || 'Failed to add to wishlist.';
      toast.error(errorMessage);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );
  if (error)
    return <div className="text-center py-8 text-red-600">Error: {error}</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <nav className="flex items-center gap-2 text-sm mb-8">
        <a href="#" className="text-gray-600 hover:text-gray-900">
          Home
        </a>
        <span className="text-gray-400">/</span>
        <a href="#" className="text-gray-600 hover:text-gray-900">
          Shop
        </a>
        <span className="text-gray-400">/</span>
        <span className="text-gray-900">All Products</span>
      </nav>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <ProductFilters
          searchTerm={searchTerm}
          categories={categories}
          selectedCategories={selectedCategories}
          priceRange={priceRange}
          selectedRatings={selectedRatings}
          onSearchChange={setSearchTerm}
          onCategoryChange={handleCategoryChange}
          onPriceChange={setPriceRange}
          onRatingChange={handleRatingChange}
          onClearFilters={handleClearFilters}
        />
        <div className="lg:col-span-3 mt-10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="featured">Featured</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
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
          <div
            className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                : 'space-y-6'
            }
          >
            {products.results?.length === 0 ? (
              <div className="text-center py-8 text-gray-600">
                No products found
              </div>
            ) : (
              products.results.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  viewMode={viewMode}
                  onAddToWishlist={handleAddToWishlist}
                />
              ))
            )}
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default Products;
