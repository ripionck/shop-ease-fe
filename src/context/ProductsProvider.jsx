import axios from 'axios';
import PropTypes from 'prop-types';
import { useMemo, useState } from 'react';
import useAuth from '../hooks/useAuth';
import ProductsContext from './ProductsContext';

const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState({ results: [], count: 0 });
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

  const handleError = (err) => {
    const errorMessage = err.response?.data?.message || 'An error occurred';
    const errorCode = err.response?.data?.error
      ? ` (${err.response.data.error})`
      : '';
    setError(`${errorMessage}${errorCode}`);
  };

  const fetchProducts = async (params = {}) => {
    setLoading(true);
    try {
      const response = await publicApi.get('products/', { params });

      // Correct response structure access
      const productData = response.data.results.products;
      const count = response.data.results.count;

      console.log('API Response Products:', productData);
      console.log('API Response Count:', count);

      setProducts({ results: productData, count });
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

  const createProduct = async (productData) => {
    if (!verifyAdmin()) return;
    setError(null);
    setLoading(true);
    try {
      const response = await api.post('products/', productData);
      setProducts((prev) => ({
        ...prev,
        results: [...prev.results, response.data.data],
      }));
    } catch (err) {
      handleError(err);
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
          product.id === id ? response.data.data : product,
        ),
      }));
    } catch (err) {
      handleError(err);
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
      handleError(err);
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
          headers: { 'Content-Type': 'multipart/form-data' },
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

export default ProductsProvider;
