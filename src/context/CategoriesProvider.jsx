import axios from 'axios';
import PropTypes from 'prop-types';
import { useEffect, useMemo, useState } from 'react';
import useAuth from '../hooks/useAuth';
import CategoriesContext from './CategoriesContext';

export const CategoriesProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { auth } = useAuth();

  // Memoized axios instances
  const api = useMemo(
    () =>
      axios.create({
        baseURL: 'https://shop-ease-3oxf.onrender.com/api/v1/',
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      }),
    [auth.accessToken],
  );

  const publicApi = useMemo(
    () =>
      axios.create({
        baseURL: 'https://shop-ease-3oxf.onrender.com/api/v1/',
      }),
    [],
  );

  // Optional: Fetch categories on initial load
  useEffect(() => {
    fetchCategories();
  }, []);

  const handleError = (err, defaultMessage) => {
    setError(err.response?.data?.message || err.message || defaultMessage);
  };

  const verifyAdmin = () => {
    if (auth.user?.role !== 'admin') {
      setError('Only admin users can perform this action');
      return false;
    }
    return true;
  };

  const fetchCategories = async () => {
    setError(null);
    setLoading(true);
    try {
      const response = await publicApi.get('categories/');
      setCategories(response.data.categories || []);
    } catch (err) {
      handleError(err, 'Failed to fetch categories');
    } finally {
      setLoading(false);
    }
  };

  const createCategory = async (categoryData) => {
    if (!verifyAdmin()) return;

    setError(null);
    setLoading(true);
    try {
      const response = await api.post('categories/', categoryData);
      setCategories((prev) => [...prev, response.data]);
    } catch (err) {
      handleError(err, 'Failed to create category');
    } finally {
      setLoading(false);
    }
  };

  const updateCategory = async (id, categoryData) => {
    if (!verifyAdmin()) return;

    setError(null);
    setLoading(true);
    try {
      const response = await api.put(`categories/${id}/`, categoryData);
      setCategories((prev) =>
        prev.map((category) => (category.id === id ? response.data : category)),
      );
    } catch (err) {
      handleError(err, 'Failed to update category');
    } finally {
      setLoading(false);
    }
  };

  const deleteCategory = async (id) => {
    if (!verifyAdmin()) return;

    setError(null);
    setLoading(true);
    try {
      await api.delete(`categories/${id}/`);
      setCategories((prev) => prev.filter((category) => category.id !== id));
    } catch (err) {
      handleError(err, 'Failed to delete category');
    } finally {
      setLoading(false);
    }
  };

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
