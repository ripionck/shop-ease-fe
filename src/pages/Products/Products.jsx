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

const Products = () => {
  const { categories } = useCategories();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('featured');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const productsPerPage = 9;
  const { auth } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = new URLSearchParams();

        if (searchTerm) params.append('search', searchTerm);

        // Append categories (adjust based on backend expectations)
        if (selectedCategories.length > 0) {
          selectedCategories.forEach((category) =>
            params.append('category[]', category),
          );
        }

        params.append('min_price', priceRange[0]);
        params.append('max_price', priceRange[1]);

        if (selectedRatings.length > 0) {
          selectedRatings.forEach((rating) =>
            params.append('rating[]', rating),
          );
        }

        params.append('sort', sortBy);
        params.append('page', currentPage);

        console.log('Sending Params:', params.toString()); // Debugging log

        const response = await axios.get(
          'http://127.0.0.1:8000/api/v1/products/',
          {
            params: params,
          },
        );

        setProducts(response.data.results.products);
        setTotalPages(Math.ceil(response.data.count / productsPerPage));
      } catch (error) {
        setError(error.message);
        console.error('Error fetching data:', error);
        toast.error('Failed to fetch products. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [
    currentPage,
    searchTerm,
    selectedCategories,
    priceRange,
    selectedRatings,
    sortBy,
  ]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category],
    );
    setCurrentPage(1); // Reset pagination when filters change
  };

  const handleRatingChange = (rating) => {
    setSelectedRatings((prev) =>
      prev.includes(rating)
        ? prev.filter((r) => r !== rating)
        : [...prev, rating],
    );
    setCurrentPage(1); // Reset pagination when filters change
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
      await axios.post(
        'http://127.0.0.1:8000/api/v1/wishlist/add/',
        { product_id: productId },
        { headers: { Authorization: `Bearer ${auth.accessToken}` } },
      );
      toast.success('Added to wishlist!');
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      toast.error(
        error.response?.data?.message || 'Failed to add to wishlist.',
      );
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
            {products.length === 0 ? (
              <div className="text-center py-8 text-gray-600">
                No products found
              </div>
            ) : (
              products.map((product) => (
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
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Products;
