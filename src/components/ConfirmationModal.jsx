import { CheckCircle } from 'lucide-react';
import PropTypes from 'prop-types';

export function ConfirmationModal({ isOpen, onClose, orderDetails }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 relative">
        <div className="flex flex-col items-center text-center">
          <div className="mb-4">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Order Placed Successfully!
          </h3>
          <p className="text-gray-600 mb-6">
            Thank you for your order. We&apos;ll send you a confirmation email
            shortly with your order details.
          </p>
          <div className="border-t border-gray-200 pt-4 w-full">
            <p className="text-gray-600 mb-2">
              Order number: {orderDetails.number}
            </p>
            <p className="text-gray-600 mb-2">Total: ${orderDetails.total}</p>
            <p className="text-gray-600">
              Estimated delivery: 3-5 business days
            </p>
          </div>
          <button
            onClick={onClose}
            className="mt-6 bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}

ConfirmationModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  orderDetails: PropTypes.shape({
    number: PropTypes.string.isRequired,
    total: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    date: PropTypes.string,
  }).isRequired,
};
