import axios from 'axios';
import PropTypes from 'prop-types';
import { createContext, useEffect, useMemo, useState } from 'react';
import useAuth from '../hooks/useAuth';

// Create CategoriesContext
const CategoriesContext = createContext({
  categories: [],
  loading: false,
  error: null,
  fetchCategories: () => {},
  createCategory: () => {},
  updateCategory: () => {},
  deleteCategory: () => {},
});

const CategoriesProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { auth } = useAuth();

  // Authorized API instance
  const api = useMemo(
    () =>
      axios.create({
        baseURL: 'https://shop-ease-3oxf.onrender.com/api/v1/',
        headers: { Authorization: `Bearer ${auth.accessToken}` },
      }),
    [auth.accessToken],
  );

  // Public API instance
  const publicApi = useMemo(
    () =>
      axios.create({ baseURL: 'https://shop-ease-3oxf.onrender.com/api/v1/' }),
    [],
  );

  // Error handler
  const handleError = (err) => {
    const errorMessage = err.response?.data?.message || 'An error occurred';
    const errorCode = err.response?.data?.error
      ? ` (${err.response.data.error})`
      : '';
    setError(`${errorMessage}${errorCode}`);
  };

  // Fetch categories
  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await publicApi.get('categories/');
      setCategories(response.data.data || []);
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  // Admin verification
  const verifyAdmin = () => {
    if (auth.user?.role !== 'admin') {
      setError('Only admin users can perform this action');
      return false;
    }
    return true;
  };

  // Create category
  const createCategory = async (categoryData) => {
    if (!verifyAdmin()) return;
    setError(null);
    setLoading(true);
    try {
      const response = await api.post('categories/', categoryData);
      setCategories((prev) => [...prev, response.data.category]);
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  // Update category
  const updateCategory = async (id, categoryData) => {
    if (!verifyAdmin()) return;
    setError(null);
    setLoading(true);
    try {
      const response = await api.put(`categories/${id}/`, categoryData);
      setCategories((prev) =>
        prev.map((cat) => (cat.id === id ? response.data.category : cat)),
      );
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  // Delete category
  const deleteCategory = async (id) => {
    if (!verifyAdmin()) return;
    setError(null);
    setLoading(true);
    try {
      await api.delete(`categories/${id}/`);
      setCategories((prev) => prev.filter((cat) => cat.id !== id));
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <CategoriesContext.Provider
      value={{
        categories,
        loading,
        error,
        fetchCategories,
        createCategory,
        updateCategory,
        deleteCategory,
      }}
    >
      {children}
    </CategoriesContext.Provider>
  );
};

CategoriesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { CategoriesContext, CategoriesProvider };
