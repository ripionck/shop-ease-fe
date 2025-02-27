import axios from 'axios';
import PropTypes from 'prop-types';
import { useEffect, useMemo, useState } from 'react';
import useAuth from '../hooks/useAuth';
import CategoriesContext from './CategoriesContext';

const CategoriesProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { auth } = useAuth();

  const api = useMemo(
    () =>
      axios.create({
        baseURL: 'https://shop-ease-3oxf.onrender.com/api/v1/',
        headers: { Authorization: `Bearer ${auth.accessToken}` },
      }),
    [auth.accessToken],
  );

  const publicApi = useMemo(
    () =>
      axios.create({ baseURL: 'https://shop-ease-3oxf.onrender.com/api/v1/' }),
    [],
  );

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleError = (err) => {
    const errorMessage = err.response?.data?.message || 'An error occurred';
    const errorCode = err.response?.data?.error
      ? ` (${err.response.data.error})`
      : '';
    setError(`${errorMessage}${errorCode}`);
  };

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

  const verifyAdmin = () => {
    if (auth.user?.role !== 'admin') {
      setError('Only admin users can perform this action');
      return false;
    }
    return true;
  };

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

export default CategoriesProvider;
