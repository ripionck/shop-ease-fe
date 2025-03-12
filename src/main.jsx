import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import App from './App.jsx';

import { AuthProvider } from './context/AuthProvider.jsx';
import { CartProvider } from './context/CartProvider.jsx';
import { CategoriesProvider } from './context/CategoriesProvider.jsx';
import { ProductsProvider } from './context/ProductsProvider.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <ProductsProvider>
        <CategoriesProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </CategoriesProvider>
      </ProductsProvider>
    </AuthProvider>
    <ToastContainer />
  </StrictMode>,
);
