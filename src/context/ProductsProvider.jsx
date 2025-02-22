import axios from 'axios';
import PropTypes from 'prop-types';
import { useEffect, useMemo, useState } from 'react';
import useAuth from '../hooks/useAuth';
import ProductsContext from './ProductsContext';

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
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

  // Optional: Fetch products on initial load
  useEffect(() => {
    fetchProducts();
  }, []);

  const handleError = (err, defaultMessage) => {
    setError(err.response?.data?.message || err.message || defaultMessage);
  };

  const fetchProducts = async (params = {}) => {
    setLoading(true);
    try {
      const response = await publicApi.get('products/', { params });
      console.log(response);
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
      setProducts((prev) => [...prev, response.data]);
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
      const response = await api.put(`products/${id}/`, productData);
      setProducts((prev) =>
        prev.map((product) => (product.id === id ? response.data : product)),
      );
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
      setProducts((prev) => prev.filter((product) => product.id !== id));
    } catch (err) {
      handleError(err, 'Failed to delete product');
    } finally {
      setLoading(false);
    }
  };

  const uploadProductImage = async (productId, imageFile) => {
    if (!verifyAdmin()) return;

    setError(null);
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('image', imageFile);
      const response = await api.post(
        `products/${productId}/images/`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      setProducts((prev) =>
        prev.map((product) =>
          product.id === productId
            ? {
                ...product,
                images: [...(product.images || []), response.data],
              }
            : product,
        ),
      );
    } catch (err) {
      handleError(err, 'Failed to upload product image');
    } finally {
      setLoading(false);
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
