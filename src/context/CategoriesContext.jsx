import { createContext } from 'react';

const CategoriesContext = createContext({
  categories: [],
  loading: false,
  error: null,
  fetchCategories: () => {},
  createCategory: () => {},
  updateCategory: () => {},
  deleteCategory: () => {},
});

export default CategoriesContext;
