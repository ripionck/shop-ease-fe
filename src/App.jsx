import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import Layout from './components/Layout';
import AdminDashboard from './pages/AdminDashboard/AdminDashboard';
import Checkout from './pages/Checkout';
import Featured from './pages/Featured';
import FlashDeals from './pages/FlashDeals';
import Home from './pages/Home';
import Login from './pages/Login';
import ProductDetail from './pages/ProductDetail';
import Products from './pages/Products';
import Register from './pages/Register';
import ShoppingCart from './pages/ShoppingCart';
import UserDashboard from './pages/UserDashboard/UserDashboard';

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
          <Route path="user-dashboard" element={<UserDashboard />} />
          <Route path="/admin/*" element={<AdminDashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}
