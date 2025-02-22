import axios from 'axios';
import PropTypes from 'prop-types';
import { useMemo, useState } from 'react';
import useAuth from '../hooks/useAuth';
import ProductsContext from './ProductsContext';

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState({ results: [], count: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { auth } = useAuth();

  // Memoized axios instances
  const api = useMemo(
    () =>
      axios.create({
        baseURL: 'http://127.0.0.1:8000/api/v1/',
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      }),
    [auth.accessToken],
  );

  const publicApi = useMemo(
    () =>
      axios.create({
        baseURL: 'http://127.0.0.1:8000/api/v1/',
      }),
    [],
  );

  const handleError = (err, defaultMessage) => {
    setError(err.response?.data?.message || err.message || defaultMessage);
  };

  const fetchProducts = async (params = {}) => {
    setLoading(true);
    try {
      const response = await publicApi.get('products/', { params });
      setProducts({
        results: response.data.results.products || [],
        count: response.data.count || 0,
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch products');
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

  const createProduct = async (productData) => {
    if (!verifyAdmin()) return;

    setError(null);
    setLoading(true);
    try {
      const response = await api.post('products/', productData);
      setProducts((prev) => ({
        ...prev,
        results: [...prev.results, response.data],
      }));
    } catch (err) {
      handleError(err, 'Failed to create product');
    } finally {
      setLoading(false);
    }
  };

  const updateProduct = async (id, productData) => {
    if (!verifyAdmin()) return;

    setError(null);
    setLoading(true);
    try {
      const response = await api.patch(`products/${id}/`, productData);
      setProducts((prev) => ({
        ...prev,
        results: prev.results.map((product) =>
          product.id === id ? response.data : product,
        ),
      }));
    } catch (err) {
      handleError(err, 'Failed to update product');
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    if (!verifyAdmin()) return;

    setError(null);
    setLoading(true);
    try {
      await api.delete(`products/${id}/`);
      setProducts((prev) => ({
        ...prev,
        results: prev.results.filter((product) => product.id !== id),
      }));
    } catch (err) {
      handleError(err, 'Failed to delete product');
    } finally {
      setLoading(false);
    }
  };

  const uploadProductImage = async (productId, formData) => {
    try {
      const response = await api.post(
        `/products/${productId}/images/`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      return response.data;
    } catch (error) {
      console.error('Image upload error:', error.response?.data);
      throw error;
    }
  };

  return (
    <ProductsContext.Provider
      value={{
        products,
        loading,
        error,
        fetchProducts,
        createProduct,
        updateProduct,
        deleteProduct,
        uploadProductImage,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

ProductsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
