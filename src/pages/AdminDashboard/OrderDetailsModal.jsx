import { X } from 'lucide-react';
import PropTypes from 'prop-types';

export default function OrderDetailsModal({ isOpen, onClose, order }) {
  if (!isOpen || !order) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Order Details #{order.id}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-8 mb-8">
          {/* Customer Information */}
          <div>
            <h3 className="font-medium mb-2">Customer Information</h3>
            <p className="text-gray-600">
              {order.shipping_address.first_name}
              {order.shipping_address.last_name}
            </p>
            <p className="text-gray-600"># {order.user_id}</p>
          </div>

          {/* Shipping Address */}
          <div>
            <h3 className="font-medium mb-2">Shipping Address</h3>
            <p className="text-gray-600">
              {order.shipping_address.street_address}
            </p>
            <p className="text-gray-600">
              {order.shipping_address.city}, {order.shipping_address.state}
              {order.shipping_address.zip_code}
            </p>
            <p className="text-gray-600">{order.shipping_address.country}</p>
          </div>
        </div>

        {/* Order Items */}
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
              {order.items.map((item) => (
                <tr key={item.product_id} className="border-b">
                  <td className="px-4 py-2">{item.product_name}</td>
                  <td className="px-4 py-2">{item.quantity}</td>
                  <td className="px-4 py-2">${item.price}</td>
                  <td className="px-4 py-2">
                    ${(item.price * item.quantity).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Order Summary */}
        <div className="text-right">
          <p className="text-sm text-gray-600">
            Subtotal: ${order.total_amount}
          </p>
          <p className="text-sm text-gray-600">Shipping: $9.99</p>
          <p className="text-lg font-semibold mt-2">
            Total: ${(parseFloat(order.total_amount) + 9.99).toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
}

OrderDetailsModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  order: PropTypes.shape({
    id: PropTypes.string.isRequired,
    user_id: PropTypes.string.isRequired,
    total_amount: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        product_id: PropTypes.string.isRequired,
        product_name: PropTypes.string.isRequired,
        quantity: PropTypes.number.isRequired,
        price: PropTypes.string.isRequired,
      }),
    ).isRequired,
    shipping_address: PropTypes.shape({
      first_name: PropTypes.string.isRequired,
      last_name: PropTypes.string.isRequired,
      street_address: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
      state: PropTypes.string.isRequired,
      zip_code: PropTypes.string.isRequired,
      country: PropTypes.string.isRequired,
    }).isRequired,
  }),
};
