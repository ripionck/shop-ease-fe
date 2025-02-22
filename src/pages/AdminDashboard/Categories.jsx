import axios from 'axios';
import { Pencil, Trash } from 'lucide-react';
import { useEffect, useState } from 'react';
import Spinner from '../../components/Spinner';
import useAuth from '../../hooks/useAuth';
import AddCategoryModal from './AddCategoryModal';

export default function Categories() {
  const { auth } = useAuth();
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Public API instance for GET requests
  const publicApi = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/v1/',
  });

  // Authenticated API instance for write operations
  const authApi = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/v1/',
    headers: {
      Authorization: `Bearer ${auth?.accessToken}`,
    },
  });

  const fetchCategories = async () => {
    try {
      const response = await publicApi.get('categories/');
      setCategories(response.data.categories);
      setLoading(false);
    } catch (err) {
      setError('Failed to load categories', err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = async (id) => {
    if (auth.user?.role !== 'admin') {
      setError('Only admin users can delete categories');
      return;
    }

    try {
      await authApi.delete(`categories/${id}/`);
      setCategories(categories.filter((cat) => cat.id !== id));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete category');
    }
  };

  const handleSubmit = async (formData) => {
    if (auth.user?.role !== 'admin') {
      setError('Only admin users can modify categories');
      return;
    }

    try {
      if (selectedCategory) {
        // Update
        const response = await authApi.patch(
          `categories/${selectedCategory.id}/`,
          formData,
        );
        setCategories(
          categories.map((cat) =>
            cat.id === selectedCategory.id ? response.data.category : cat,
          ),
        );
      } else {
        // Create
        const response = await authApi.post('categories/', formData);
        setCategories([...categories, response.data.category]);
      }
      setIsModalOpen(false);
      setSelectedCategory(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Operation failed');
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );
  if (error) return <div className="p-6 text-red-600">Error: {error}</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Categories</h1>
        {auth.user?.role === 'admin' && (
          <button
            onClick={() => {
              setSelectedCategory(null);
              setIsModalOpen(true);
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Add Category
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((category) => (
          <div key={category.id} className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {category.name}
                </h2>
                <p className="text-gray-500">
                  {category.totalProducts} products
                </p>
              </div>
              {auth.user?.role === 'admin' && (
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setSelectedCategory(category);
                      setIsModalOpen(true);
                    }}
                    className="p-2 text-blue-600 hover:text-blue-700"
                  >
                    <Pencil className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(category.id)}
                    className="p-2 text-red-600 hover:text-red-700"
                  >
                    <Trash className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Active Products</span>
                <span className="text-green-600">
                  {category.activeProducts}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Out of Stock</span>
                <span className="text-red-600">{category.outOfStock}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <AddCategoryModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedCategory(null);
        }}
        onSubmit={handleSubmit}
        category={selectedCategory}
      />
    </div>
  );
}
