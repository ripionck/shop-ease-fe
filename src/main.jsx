import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import AuthProvider from './context/AuthProvider.jsx';
import { CategoriesProvider } from './context/CategoriesProvider.jsx';
import { ProductsProvider } from './context/ProductsProvider.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <ProductsProvider>
        <CategoriesProvider>
          <App />
        </CategoriesProvider>
      </ProductsProvider>
    </AuthProvider>
  </StrictMode>,
);
