import axios from 'axios';
import PropTypes from 'prop-types';
import { useState } from 'react';
import useAuth from '../hooks/useAuth';
import ProductsContext from './ProductsContext';

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { auth } = useAuth();

  const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/v1/',
    headers: {
      Authorization: `Bearer ${auth.accessToken}`,
    },
  });

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await api.get('products/');
      setProducts(response.data.products || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const createProduct = async (productData) => {
    if (auth.user?.role !== 'admin') {
      setError('Only admin users can create products');
      return;
    }

    setLoading(true);
    try {
      const response = await api.post('products/', productData);
      setProducts((prev) => [...prev, response.data]);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create product');
    } finally {
      setLoading(false);
    }
  };

  const updateProduct = async (id, productData) => {
    if (auth.user?.role !== 'admin') {
      setError('Only admin users can update products');
      return;
    }

    setLoading(true);
    try {
      const response = await api.put(`products/${id}/`, productData);
      setProducts((prev) =>
        prev.map((product) => (product.id === id ? response.data : product)),
      );
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update product');
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    if (auth.user?.role !== 'admin') {
      setError('Only admin users can delete products');
      return;
    }

    setLoading(true);
    try {
      await api.delete(`products/${id}/`);
      setProducts((prev) => prev.filter((product) => product.id !== id));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete product');
    } finally {
      setLoading(false);
    }
  };

  const uploadProductImage = async (productId, imageFile) => {
    if (auth.user?.role !== 'admin') {
      setError('Only admin users can upload product images');
      return;
    }

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
            ? { ...product, images: [...product.images, response.data] }
            : product,
        ),
      );
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to upload product image');
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
