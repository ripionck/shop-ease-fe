import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Layout from './components/Layout';
import ShoppingCart from './pages/ShoppingCart';
import Checkout from './pages/Checkout';
import FlashDeals from './pages/FlashDeals';
import Products from './pages/Products';
import Wishlist from './pages/Wishlist';
import UserDashboard from './pages/UserDashboard';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          {/* <Route path="shop" element={<ProductListingPage />} />
          <Route path="product/:id" element={<ProductDetailPage />} />
          <Route path="orders" element={<OrdersPage />} />
           */}
          <Route path="shop" element={<Products />} />
          <Route path="flash-deals" element={<FlashDeals />} />
          <Route path="wishlist" element={<Wishlist />} />
          <Route path="cart" element={<ShoppingCart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="dashboard" element={<UserDashboard />} />
        </Route>
        {/* <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="products/add" element={<AdminAddProduct />} />
          <Route path="categories" element={<AdminCategories />} />
          <Route path="categories/add" element={<AdminAddCategory />} />
          <Route path="inventory" element={<AdminInventory />} />
          <Route path="inventory/update/:id" element={<AdminUpdateStock />} />
        </Route> */}
      </Routes>
    </Router>
  );
}
