import { Edit, Search, Trash } from 'lucide-react';
import { useEffect, useState } from 'react';
import Spinner from '../../components/Spinner';
import useAuth from '../../hooks/useAuth';
import useCategories from '../../hooks/useCategories';
import useProducts from '../../hooks/useProducts';
import AddProductModal from './AddProductModal';

export default function Products() {
  const { auth } = useAuth();
  const {
    products,
    loading: productsLoading,
    error: productsError,
    fetchProducts,
    createProduct,
    deleteProduct,
    uploadProductImage,
  } = useProducts();
  const {
    categories,
    loading: categoriesLoading,
    error: categoriesError,
  } = useCategories();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch products with filters, sorting, and pagination
  useEffect(() => {
    const params = {
      search: searchTerm,
      category: selectedCategory,
      ordering: sortBy,
      page: currentPage,
      page_size: productsPerPage,
    };
    fetchProducts(params);
  }, [searchTerm, selectedCategory, sortBy, currentPage]);

  // Handle product deletion
  const handleDelete = async (id) => {
    if (auth.user?.role !== 'admin') {
      alert('Only admin users can delete products');
      return;
    }
    await deleteProduct(id);
    fetchProducts(); // Refresh the list after deletion
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  // Handle category filter change
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setCurrentPage(1); // Reset to first page when filtering
  };

  // Handle sorting change
  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    setCurrentPage(1); // Reset to first page when sorting
  };

  // Handle product creation and image upload
  const handleSubmit = async (formData) => {
    try {
      // Create the product
      const productResponse = await createProduct({
        name: formData.name,
        description: formData.description,
        price: formData.price,
        category_id: formData.category_id,
        brand: formData.brand,
        stock_quantity: formData.stock_quantity,
      });

      // Upload images after product creation
      if (formData.images && formData.images.length > 0) {
        await Promise.all(
          formData.images.map(async (image) => {
            await uploadProductImage(productResponse.id, image.file);
          }),
        );
      }

      setIsModalOpen(false);
      fetchProducts(); // Refresh the product list
    } catch (err) {
      console.error('Error creating product:', err);
    }
  };

  // Loading and error states
  if (productsLoading || categoriesLoading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );
  if (productsError)
    return <div className="p-6 text-red-600">Error: {productsError}</div>;
  if (categoriesError)
    return <div className="p-6 text-red-600">Error: {categoriesError}</div>;

  return (
    <div className="space-y-6">
      {/* Header and Add Product Button */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Products</h1>
        {auth.user?.role === 'admin' && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
          >
            Add Product
          </button>
        )}
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="pl-10 pr-4 py-2 border rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            </div>
            <div className="flex items-center gap-4">
              <select
                value={selectedCategory}
                onChange={handleCategoryChange}
                className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              <select
                value={sortBy}
                onChange={handleSortChange}
                className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Sort by</option>
                <option value="name">Name (A-Z)</option>
                <option value="-name">Name (Z-A)</option>
                <option value="price">Price (Low-High)</option>
                <option value="-price">Price (High-Low)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Products Table */}
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Product
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Stock
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {products.results?.length > 0 ? (
              products.results.map((product) => (
                <tr key={product.id}>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      {product.images?.length > 0 && (
                        <img
                          src={product.images[0].image}
                          alt={product.name}
                          className="h-10 w-10 flex-shrink-0 rounded-lg mr-4"
                        />
                      )}
                      {product.name}
                    </div>
                  </td>
                  <td className="px-6 py-4">{product.category}</td>
                  <td className="px-6 py-4">${product.price}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {product.stock_quantity || 'N/A'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => {
                          setIsModalOpen(true);
                          // Pass product to modal for editing
                        }}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-center items-center p-4">
          {Array.from(
            { length: Math.ceil(products.count / productsPerPage) },
            (_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`mx-1 px-3 py-1 rounded ${
                  currentPage === i + 1
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700'
                }`}
              >
                {i + 1}
              </button>
            ),
          )}
        </div>
      </div>

      {/* Add Product Modal */}
      {auth.user?.role === 'admin' && (
        <AddProductModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSubmit}
          categories={categories}
        />
      )}
    </div>
  );
}
