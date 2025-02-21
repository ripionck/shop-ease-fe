import { X } from 'lucide-react';
import PropTypes from 'prop-types';
export default function OrderDetailsModal({ isOpen, onClose, order }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Order Details #{order?.id}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="font-medium mb-2">Customer Information</h3>
            <p className="text-gray-600">John Doe</p>
            <p className="text-gray-600">john@example.com</p>
            <p className="text-gray-600">+1 234 567 890</p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Shipping Address</h3>
            <p className="text-gray-600">123 Main St</p>
            <p className="text-gray-600">Apt 4B</p>
            <p className="text-gray-600">New York, NY 10001</p>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="font-medium mb-4">Order Items</h3>
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                  Product
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                  Quantity
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                  Price
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                  Total
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="px-4 py-2">Wireless Headphones</td>
                <td className="px-4 py-2">1</td>
                <td className="px-4 py-2">$199.99</td>
                <td className="px-4 py-2">$199.99</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-start mb-8">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Order Status
            </label>
            <select className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500">
              <option>New</option>
              <option>Processing</option>
              <option>Shipped</option>
              <option>Delivered</option>
            </select>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Subtotal: $199.99</p>
            <p className="text-sm text-gray-600">Shipping: $9.99</p>
            <p className="text-lg font-semibold mt-2">Total: $209.98</p>
          </div>
        </div>

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
          >
            Print Invoice
          </button>
          <button
            type="button"
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
          >
            Update Order
          </button>
        </div>
      </div>
    </div>
  );
}

OrderDetailsModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  order: PropTypes.shape({
    id: PropTypes.string,
  }),
};
