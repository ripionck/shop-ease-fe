import axios from 'axios';
import { Edit, Search, Trash } from 'lucide-react';
import { useEffect, useState } from 'react';
import Spinner from '../../components/Spinner';
import useAuth from '../../hooks/useAuth';
import AddProductModal from './AddProductModal';

export default function Products() {
  const { auth } = useAuth();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  console.log(products);

  // Public API instance
  const publicApi = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/v1/',
  });

  // Authenticated API instance
  const authApi = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/v1/',
    headers: {
      Authorization: `Bearer ${auth?.accessToken}`,
    },
  });

  // Fetch products
  const fetchProducts = async () => {
    try {
      const params = {
        search: searchTerm,
        category: selectedCategory,
        ordering: sortBy,
      };
      const response = await publicApi.get('products/', { params });
      console.log('API Response:', response);

      if (
        response.data &&
        response.data.products &&
        Array.isArray(response.data.products)
      ) {
        setProducts(response.data.products);
      } else {
        setProducts([]);
      }
      setLoading(false);
    } catch (err) {
      console.error('Error fetching products:', err);
      console.error('Error Response:', err.response?.data);
      setError(err.response?.data?.message || 'Failed to load products');
      setLoading(false);
    }
  };

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const response = await publicApi.get('categories/');
      if (response.data && Array.isArray(response.data.categories)) {
        setCategories(response.data.categories);
      } else {
        setCategories([]);
      }
    } catch (err) {
      console.error('Error fetching categories:', err);
      setError('Failed to load categories');
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [searchTerm, selectedCategory, sortBy]);

  // Delete product (Admin only)
  const handleDelete = async (id) => {
    if (auth.user?.role !== 'admin') {
      setError('Only admin users can delete products');
      return;
    }

    try {
      await authApi.delete(`products/${id}/`);
      setProducts(products.filter((product) => product.id !== id));
    } catch (err) {
      console.error('Error deleting product:', err);
      setError(err.response?.data?.message || 'Failed to delete product');
    }
  };

  // Handle product creation/update
  const handleSubmit = async (formData) => {
    try {
      const productData = {
        name: formData.name,
        description: formData.description,
        price: formData.price,
        discounted_price: formData.discounted_price,
        category_id: formData.category_id,
        brand: formData.brand,
        stock_quantity: formData.stock_quantity,
        is_active: formData.is_active,
        features: formData.features,
        specifications: formData.specifications,
      };

      const productResponse = await authApi.post('products/', productData);

      // Upload images
      if (formData.images && formData.images.length > 0) {
        await Promise.all(
          formData.images.map(async (image) => {
            const imageFormData = new FormData();
            imageFormData.append('image', image.file);
            imageFormData.append('is_main', image.is_main);
            await authApi.post(
              `products/${productResponse.data.id}/images/`,
              imageFormData,
            );
          }),
        );
      }

      fetchProducts();
      setIsModalOpen(false);
    } catch (err) {
      console.error('Error creating product:', err);
      setError(err.response?.data?.message || 'Failed to create product');
    }
  };

  if (loading) return <Spinner />;
  if (error) return <div className="p-6 text-red-600">Error: {error}</div>;

  return (
    <div className="space-y-6">
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

      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            </div>
            <div className="flex items-center gap-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
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
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Sort by</option>
                <option value="name">Name</option>
                <option value="price">Price</option>
                <option value="stock_quantity">Stock</option>
              </select>
            </div>
          </div>
        </div>

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
            {products.length > 0 ? (
              products.map((product) => (
                <tr key={product.id}>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0 bg-gray-100 rounded-lg mr-4" />
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
                          setSelectedCategory(product);
                          setIsModalOpen(true);
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
      </div>

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
