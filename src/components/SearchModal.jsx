import { Search, X } from 'lucide-react';
import PropTypes from 'prop-types';

export default function SearchModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          onClick={onClose}
        />

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-start justify-center p-4 text-center sm:p-0">
            <div className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6">
              <div className="absolute right-0 top-0 pr-4 pt-4">
                <button
                  type="button"
                  className="rounded-md bg-white text-gray-400 hover:text-gray-500"
                  onClick={onClose}
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

                  <div className="mt-6">
                    <h4 className="text-sm font-medium text-gray-900 mb-3">
                      Popular Searches
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {['Headphones', 'Smartphones', 'Laptops', 'Watches'].map(
                        (term) => (
                          <button
                            key={term}
                            className="px-3 py-1 text-sm bg-gray-100 text-gray-800 rounded-full hover:bg-gray-200"
                          >
                            {term}
                          </button>
                        ),
                      )}
                    </div>
                  </div>

                  <div className="mt-6">
                    <h4 className="text-sm font-medium text-gray-900 mb-3">
                      Recent Searches
                    </h4>
                    <div className="space-y-2">
                      {['Wireless Earbuds', 'Gaming Laptop', 'Smart Watch'].map(
                        (term) => (
                          <button
                            key={term}
                            className="flex items-center text-gray-600 hover:text-indigo-600 text-sm"
                          >
                            <Search className="h-4 w-4 mr-2" />
                            {term}
                          </button>
                        ),
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

SearchModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
