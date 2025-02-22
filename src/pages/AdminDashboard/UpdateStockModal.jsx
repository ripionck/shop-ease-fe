import { X } from 'lucide-react';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

export default function UpdateStockModal({
  isOpen,
  onClose,
  product,
  onUpdateStock,
}) {
  const [newStockQuantity, setNewStockQuantity] = useState(
    product?.stock_quantity || 0,
  );
  const [error, setError] = useState('');

  // Update state when product changes
  useEffect(() => {
    if (product) {
      setNewStockQuantity(product.stock_quantity);
    }
  }, [product]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate input
    if (newStockQuantity < 0) {
      setError('Stock quantity cannot be negative.');
      return;
    }

    // Call the parent handler to update stock
    onUpdateStock(product.id, newStockQuantity);
    onClose(); // Close the modal after submission
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Update Stock</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Name
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              value={product?.name || ''}
              readOnly
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Current Stock
            </label>
            <input
              type="number"
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              value={newStockQuantity}
              onChange={(e) => setNewStockQuantity(parseInt(e.target.value))}
              min="0"
              required
            />
          </div>

          {error && <div className="text-red-600 text-sm">{error}</div>}

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
            >
              Update Stock
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

UpdateStockModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    stock_quantity: PropTypes.number.isRequired,
  }),
  onUpdateStock: PropTypes.func.isRequired,
};
