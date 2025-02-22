import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Layout from './components/layout/Layout';
import AdminDashboard from './pages/AdminDashboard/AdminDashboard';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Featured from './pages/Featured/Featured';
import FlashDeals from './pages/FlashDeals';
import Home from './pages/Home';
import ProductDetails from './pages/Products/ProductDetails';
import Products from './pages/Products/Products';
import UserDashboard from './pages/UserDashboard/UserDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="featured" element={<Featured />} />
          <Route path="shop" element={<Products />} />
          <Route path="products/:id" element={<ProductDetails />} />
          <Route path="flash-deals" element={<FlashDeals />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="/user/*" element={<UserDashboard />} />
          <Route path="/admin/*" element={<AdminDashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
