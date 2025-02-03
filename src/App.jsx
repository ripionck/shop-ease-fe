import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Layout from './components/Layout';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          {/* <Route path="shop" element={<ProductListingPage />} />
          <Route path="product/:id" element={<ProductDetailPage />} />
          <Route path="cart" element={<ShoppingCartPage />} />
          <Route path="checkout" element={<CheckoutPage />} />
          <Route path="dashboard" element={<UserDashboardPage />} />
          <Route path="orders" element={<OrdersPage />} />
          <Route path="wishlist" element={<WishlistPage />} /> */}
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
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
