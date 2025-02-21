import { createContext } from 'react';

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

export default ProductsContext;
