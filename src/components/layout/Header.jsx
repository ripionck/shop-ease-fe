import {
  House,
  LogIn,
  Percent,
  Search,
  ShoppingCart,
  Star,
  Tags,
  User,
} from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useCart from '../../hooks/useCart';
import SearchModal from '../SearchModal';

export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { auth, logout } = useAuth();
  const { cartItems } = useCart();
  const navigate = useNavigate();

  const dashboardPath =
    auth?.user?.role === 'admin' ? '/admin/products' : '/user/orders';

  return (
    <>
      <header className="bg-white shadow-sm">
        <div className="bg-indigo-600 text-white px-4 py-2 text-center text-sm">
          <p>Free shipping on orders over $100 | Shop Now!</p>
        </div>

        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <a href="/" className="text-2xl font-bold text-indigo-600">
              ShopEase
            </a>

            <nav className="hidden md:flex items-center space-x-8">
              <Link
                to="/"
                className="flex items-center gap-1 text-gray-700 hover:text-indigo-600"
              >
                <House className="h-4 w-4" /> Home
              </Link>
              <Link
                to="/shop"
                className="flex items-center gap-1 text-gray-700 hover:text-indigo-600"
              >
                <Tags className="h-4 w-4" /> Shop
              </Link>
              <Link
                to="/featured"
                className="flex items-center gap-1 text-gray-700 hover:text-indigo-600"
              >
                <Star className="h-4 w-4" /> Featured
              </Link>
              <Link
                to="/flash-deals"
                className="flex items-center gap-1 text-gray-700 hover:text-indigo-600"
              >
                <Percent className="h-4 w-4" /> Deals
              </Link>
            </nav>

            <div className="flex items-center space-x-6">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="text-gray-700 hover:text-indigo-600"
              >
                <Search className="w-6 h-6" />
              </button>

              {auth?.isLoggedIn ? (
                <>
                  <Link
                    to="/cart"
                    className="text-gray-700 hover:text-indigo-600"
                  >
                    <div className="relative">
                      <ShoppingCart className="w-6 h-6" />
                      <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-indigo-600 text-white text-xs flex items-center justify-center">
                        {cartItems.length}
                      </span>
                    </div>
                  </Link>

                  <div className="relative">
                    <button
                      onClick={() => setIsProfileOpen(!isProfileOpen)}
                      className="text-gray-700 hover:text-indigo-600 relative"
                    >
                      {auth?.user?.image ? (
                        <img
                          src={auth.user.image}
                          alt="Profile"
                          className="w-8 h-8 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                          <User className="w-5 h-5 text-gray-500" />
                        </div>
                      )}
                    </button>

                    {isProfileOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 z-50">
                        <Link
                          to={dashboardPath}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          Dashboard
                        </Link>
                        <button
                          onClick={() => {
                            logout();
                            navigate('/login');
                            setIsProfileOpen(false);
                          }}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-indigo-600"
                >
                  <LogIn className="w-6 h-6" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
}
