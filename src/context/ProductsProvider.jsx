import axios from 'axios';
import PropTypes from 'prop-types';
import { createContext, useMemo, useState } from 'react';
import useAuth from '../hooks/useAuth';

// Create ProductsContext
const ProductsContext = createContext({
  products: [],
  loading: false,
  error: null,
  fetchProducts: () => {},
  createProduct: () => {},
  updateProduct: () => {},
  deleteProduct: () => {},
  uploadProductImage: () => {},
});

const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState({ results: [], count: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { auth } = useAuth();

  // API instances
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

  // Handle API errors
  const handleError = (err) => {
    const errorMessage = err.response?.data?.message || 'An error occurred';
    const errorCode = err.response?.data?.error
      ? ` (${err.response.data.error})`
      : '';
    setError(`${errorMessage}${errorCode}`);
  };

  // Fetch products
  const fetchProducts = async (params = {}) => {
    setLoading(true);
    try {
      const response = await publicApi.get('products/', { params });
      const productData = response.data.results.products;
      const count = response.data.results.count;

      setProducts({ results: productData, count });
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  // Verify admin privileges
  const verifyAdmin = () => {
    if (auth.user?.role !== 'admin') {
      setError('Only admin users can perform this action');
      return false;
    }
    return true;
  };

  // Create a new product
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

  // Update an existing product
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

  // Delete a product
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

  // Upload a product image
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

export { ProductsContext, ProductsProvider };
