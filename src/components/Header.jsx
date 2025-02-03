import { useState } from 'react';
import {
  Search,
  ShoppingCart,
  Heart,
  User,
  X,
  House,
  Percent,
  Star,
  Tags,
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

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
                className="flex items-center gap-1 Stext-gray-700 hover:text-indigo-600"
              >
                <House className="h-4 w-4 " />
                Home
              </Link>
              <Link
                to="/shop"
                className="flex items-center gap-1 text-gray-700 hover:text-indigo-600"
              >
                <Tags className="h-4 w-4" />
                Shop
              </Link>
              <Link
                href="/featured"
                className="flex items-center gap-1 text-gray-700 hover:text-indigo-600"
              >
                <Star className="h-4 w-4" />
                Featured
              </Link>
              <Link
                to="/flash-deals"
                className="flex items-center gap-1 text-gray-700 hover:text-indigo-600"
              >
                <Percent className="h-4 w-4" /> Deals
              </Link>
            </nav>

            {/* Actions */}
            <div className="flex items-center space-x-6">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="text-gray-700 hover:text-indigo-600"
                aria-label="Search"
              >
                <Search className="w-6 h-6" />
              </button>

              <Link
                to="/wishlist"
                className="text-gray-700 hover:text-indigo-600"
              >
                <div className="relative">
                  <Heart className="w-6 h-6" />
                  <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-indigo-600 text-white text-xs flex items-center justify-center">
                    2
                  </span>
                </div>
              </Link>

              <Link to="/cart" className="text-gray-700 hover:text-indigo-600">
                <div className="relative">
                  <ShoppingCart className="w-6 h-6" />
                  <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-indigo-600 text-white text-xs flex items-center justify-center">
                    3
                  </span>
                </div>
              </Link>

              <a
                href="/profile"
                className="text-gray-700 hover:text-indigo-600"
              >
                <User className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Search Modal */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            {/* Background overlay */}
            <div
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              onClick={() => setIsSearchOpen(false)}
            />

            {/* Modal panel */}
            <div className="fixed inset-0 z-10 overflow-y-auto">
              <div className="flex min-h-full items-start justify-center p-4 text-center sm:p-0">
                <div className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6">
                  <div className="absolute right-0 top-0 pr-4 pt-4">
                    <button
                      type="button"
                      className="rounded-md bg-white text-gray-400 hover:text-gray-500"
                      onClick={() => setIsSearchOpen(false)}
                    >
                      <span className="sr-only">Close</span>
                      <X className="h-6 w-6" />
                    </button>
                  </div>

                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 w-full text-center sm:mt-0 sm:text-left">
                      <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
                        Search Products
                      </h3>
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Search for products..."
                          className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          autoFocus
                        />
                        <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                      </div>

                      {/* Quick Links */}
                      <div className="mt-6">
                        <h4 className="text-sm font-medium text-gray-900 mb-3">
                          Popular Searches
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {[
                            'Headphones',
                            'Smartphones',
                            'Laptops',
                            'Watches',
                          ].map((term) => (
                            <button
                              key={term}
                              className="px-3 py-1 text-sm bg-gray-100 text-gray-800 rounded-full hover:bg-gray-200"
                            >
                              {term}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Recent Searches */}
                      <div className="mt-6">
                        <h4 className="text-sm font-medium text-gray-900 mb-3">
                          Recent Searches
                        </h4>
                        <div className="space-y-2">
                          {[
                            'Wireless Earbuds',
                            'Gaming Laptop',
                            'Smart Watch',
                          ].map((term) => (
                            <button
                              key={term}
                              className="flex items-center text-gray-600 hover:text-indigo-600 text-sm"
                            >
                              <Search className="h-4 w-4 mr-2" />
                              {term}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
