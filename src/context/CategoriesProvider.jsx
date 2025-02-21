import axios from 'axios';
import PropTypes from 'prop-types';
import { useState } from 'react';
import useAuth from '../hooks/useAuth';
import CategoriesContext from './CategoriesContext';

export const CategoriesProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { auth } = useAuth();

  const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/v1/',
    headers: {
      Authorization: `Bearer ${auth.accessToken}`,
    },
  });

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await api.get('categories/');
      setCategories(response.data.results || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch categories');
    } finally {
      setLoading(false);
    }
  };

  const createCategory = async (categoryData) => {
    if (auth.user?.role !== 'admin') {
      setError('Only admin users can create categories');
      return;
    }

    setLoading(true);
    try {
      const response = await api.post('categories/', categoryData);
      setCategories((prev) => [...prev, response.data]);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create category');
    } finally {
      setLoading(false);
    }
  };

  const updateCategory = async (id, categoryData) => {
    if (auth.user?.role !== 'admin') {
      setError('Only admin users can update categories');
      return;
    }

    setLoading(true);
    try {
      const response = await api.put(`categories/${id}/`, categoryData);
      setCategories((prev) =>
        prev.map((category) => (category.id === id ? response.data : category)),
      );
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update category');
    } finally {
      setLoading(false);
    }
  };

  const deleteCategory = async (id) => {
    if (auth.user?.role !== 'admin') {
      setError('Only admin users can delete categories');
      return;
    }

    setLoading(true);
    try {
      await api.delete(`categories/${id}/`);
      setCategories((prev) => prev.filter((category) => category.id !== id));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete category');
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
