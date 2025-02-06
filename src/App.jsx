import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Layout from './components/Layout';
import ShoppingCart from './pages/ShoppingCart';
import Checkout from './pages/Checkout';
import FlashDeals from './pages/FlashDeals';
import Products from './pages/Products';
import AdminDashboard from './pages/AdminDashboard/AdminDashboard';
import UserDashboard from './pages/UserDashboard/UserDashboard';
import ProductDetail from './pages/ProductDetail';
import Featured from './pages/Featured';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="featured" element={<Featured />} />
          <Route path="shop" element={<Products />} />
          <Route path="product/:id" element={<ProductDetail />} />
          <Route path="flash-deals" element={<FlashDeals />} />
          <Route path="cart" element={<ShoppingCart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="user" element={<UserDashboard />} />
          <Route path="admin" element={<AdminDashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}
