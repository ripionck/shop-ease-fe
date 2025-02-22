import axios from 'axios';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import Spinner from '../../components/Spinner';

const getAccessToken = () => localStorage.getItem('access_token');

// Create axios instance with auth headers
const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/v1/',
  headers: {
    Authorization: `Bearer ${getAccessToken()}`,
    'Content-Type': 'application/json',
  },
});

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [trackingInfo, setTrackingInfo] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const ordersPerPage = 5;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await api.get('/orders/', {
          params: {
            page: currentPage,
            page_size: ordersPerPage,
          },
        });
        setOrders(response.data.orders);
        setTotalPages(Math.ceil(response.data.count / ordersPerPage));
        setLoading(false);
      } catch (err) {
        if (err.response?.status === 401) {
          window.location.href = '/login';
        } else {
          setError(err.message);
        }
        setLoading(false);
      }
    };

    fetchOrders();
  }, [currentPage]);

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Fetch order details
  const handleViewDetails = async (orderId) => {
    try {
      const response = await api.get(`/orders/${orderId}/`);
      setSelectedOrder(response.data);
    } catch (err) {
      console.error('Error fetching order details:', err);
    }
  };

  // Fetch tracking information
  const handleTrackOrder = async (orderId) => {
    try {
      const response = await api.get(`/orders/track/${orderId}/`);
      setTrackingInfo(response.data);
    } catch (err) {
      console.error('Error fetching tracking info:', err);
    }
  };

  // Handle Write Review action
  const handleWriteReview = async (orderId) => {
    try {
      window.location.href = `/orders/${orderId}/review/`;
    } catch (err) {
      console.error('Error writing review:', err);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );

  if (error) {
    return <div className="text-center p-8 text-red-600">Error: {error}</div>;
  }

  if (!getAccessToken()) {
    return (
      <div className="text-center p-8">
        Please{' '}
        <a href="/login" className="text-indigo-600">
          login
        </a>{' '}
        to view your orders.
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">My Orders</h1>
        <p className="text-gray-600">View and track your order history</p>
      </div>

      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white rounded-lg shadow-sm overflow-hidden"
          >
            <div className="p-6 border-b">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-sm text-gray-600 mb-1">
                    Order #{order.id}
                  </div>
                  <div className="text-sm text-gray-600">
                    Placed on {order.date}
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  {/* Inline Status Badge */}
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      {
                        Delivered: 'bg-green-100 text-green-600',
                        'In Transit': 'bg-blue-100 text-blue-600',
                        Cancelled: 'bg-red-100 text-red-600',
                        Processing: 'bg-yellow-100 text-yellow-600',
                        Shipped: 'bg-purple-100 text-purple-600',
                        Pending: 'bg-gray-100 text-gray-600',
                      }[order.status] || 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {order.status}
                  </span>
                  <button
                    onClick={() => handleViewDetails(order.id)}
                    className="text-indigo-600 hover:text-indigo-700 text-sm"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>

            <div className="p-6">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between mb-4"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image || '/placeholder.svg'}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg bg-gray-100"
                    />
                    <div>
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-gray-600">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">${item.price}</div>
                  </div>
                </div>
              ))}

              <div className="border-t pt-4 mt-4">
                <div className="flex justify-end gap-4">
                  {order.status === 'Delivered' && (
                    <button
                      onClick={() => handleWriteReview(order.id)}
                      className="text-indigo-600 hover:text-indigo-700 text-sm"
                    >
                      Write a Review
                    </button>
                  )}
                  {order.status === 'In Transit' && (
                    <button
                      onClick={() => handleTrackOrder(order.id)}
                      className="text-indigo-600 hover:text-indigo-700 text-sm"
                    >
                      Track Order
                    </button>
                  )}
                  {order.status === 'Cancelled' && (
                    <button className="text-indigo-600 hover:text-indigo-700 text-sm">
                      Buy Again
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-2 mt-8">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 rounded-lg border hover:bg-gray-50 text-gray-600 disabled:opacity-50"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`px-3 py-1 rounded-lg ${
              currentPage === index + 1
                ? 'bg-indigo-600 text-white'
                : 'hover:bg-gray-50'
            }`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 rounded-lg border hover:bg-gray-50 text-gray-600 disabled:opacity-50"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
            <h2 className="text-xl font-bold mb-4">Order Details</h2>
            <div className="space-y-3">
              <p>
                <strong>Order ID:</strong> {selectedOrder.id}
              </p>
              <p>
                <strong>Date:</strong> {selectedOrder.date}
              </p>
              <p>
                <strong>Status:</strong> {selectedOrder.status}
              </p>
              <div className="mt-4">
                <h3 className="font-medium mb-2">Items:</h3>
                {selectedOrder.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between py-2"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <span>{item.name}</span>
                    </div>
                    <div>
                      ${item.price} x {item.quantity}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <button
              onClick={() => setSelectedOrder(null)}
              className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Tracking Info Modal */}
      {trackingInfo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Tracking Information</h2>
            <div className="space-y-2">
              <p>
                <strong>Status:</strong> {trackingInfo.status}
              </p>
              <p>
                <strong>Location:</strong> {trackingInfo.location}
              </p>
              <p>
                <strong>Estimated Delivery:</strong>{' '}
                {trackingInfo.estimated_delivery}
              </p>
            </div>
            <button
              onClick={() => setTrackingInfo(null)}
              className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
