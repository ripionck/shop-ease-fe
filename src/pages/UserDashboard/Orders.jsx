import axios from 'axios';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Spinner from '../../components/Spinner';

const getAccessToken = () => localStorage.getItem('access_token');

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/v1/',
  headers: {
    Authorization: `Bearer ${getAccessToken()}`,
  },
});

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    next: null,
    previous: null,
    count: 0,
  });
  const ordersPerPage = 5;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await api.get('/orders/', {
          params: { page_size: ordersPerPage },
        });
        setOrders(response.data.results);
        setPagination({
          next: response.data.next,
          previous: response.data.previous,
          count: response.data.count,
        });
      } catch (err) {
        handleError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleError = (err) => {
    if (err.response?.status === 401) {
      window.location.href = '/login';
    } else {
      setError(err.response?.data?.message || 'Failed to fetch orders');
      toast.error(err.response?.data?.message || 'An error occurred');
    }
  };

  const handlePageChange = async (url) => {
    try {
      setLoading(true);
      const response = await api.get(url);
      setOrders(response.data.results);
      setPagination({
        next: response.data.next,
        previous: response.data.previous,
        count: response.data.count,
      });
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelOrder = async (orderId) => {
    try {
      await api.patch(`/orders/${orderId}/cancel/`);
      toast.success('Order cancelled successfully');
      const updatedOrders = orders.map((order) =>
        order.id === orderId ? { ...order, status: 'cancelled' } : order,
      );
      setOrders(updatedOrders);
    } catch (err) {
      handleError(err);
    }
  };

  const totalPages = Math.ceil(pagination.count / ordersPerPage);
  const currentPage = pagination.next
    ? parseInt(new URL(pagination.next).searchParams.get('page')) - 1
    : totalPages;

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );

  if (error)
    return <div className="text-center p-8 text-red-600">Error: {error}</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">My Orders</h1>

      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="text-sm text-gray-600">Order #{order.id}</p>
                <p className="text-sm text-gray-600">
                  Placed on {new Date(order.created_at).toLocaleDateString()}
                </p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  {
                    completed: 'bg-green-100 text-green-600',
                    pending: 'bg-yellow-100 text-yellow-600',
                    cancelled: 'bg-red-100 text-red-600',
                  }[order.status] || 'bg-gray-100 text-gray-600'
                }`}
              >
                {order.status}
              </span>
            </div>

            <div className="border-t pt-4">
              {order.items.map((item) => (
                <div
                  key={item.product_id}
                  className="flex justify-between py-2"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.product_image}
                      alt={item.product_name}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div>
                      <p className="font-medium">{item.product_name}</p>
                      <p className="text-sm text-gray-600">
                        Qty: {item.quantity}
                      </p>
                    </div>
                  </div>
                  <p className="font-medium">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            {/* Shipping Address */}
            <div className="border-t pt-4 mt-4">
              <h3 className="text-lg font-medium mb-2">Shipping Address</h3>
              <p className="text-sm text-gray-600">
                {order.shipping_address.first_name}{' '}
                {order.shipping_address.last_name}
              </p>
              <p className="text-sm text-gray-600">
                {order.shipping_address.street_address}
              </p>
              <p className="text-sm text-gray-600">
                {order.shipping_address.city}, {order.shipping_address.state}{' '}
                {order.shipping_address.zip_code}
              </p>
              <p className="text-sm text-gray-600">
                {order.shipping_address.country}
              </p>
            </div>

            {/* Cancel Order Button */}
            {order.status === 'pending' && (
              <div className="flex justify-end mt-4">
                <button
                  onClick={() => handleCancelOrder(order.id)}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  Cancel Order
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-8 gap-2">
        <button
          onClick={() => handlePageChange(pagination.previous)}
          disabled={!pagination.previous}
          className="px-3 py-1 rounded-lg border hover:bg-gray-50 disabled:opacity-50"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() =>
              handlePageChange(
                `http://127.0.0.1:8000/api/v1/orders/?page=${
                  index + 1
                }&page_size=${ordersPerPage}`,
              )
            }
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
          onClick={() => handlePageChange(pagination.next)}
          disabled={!pagination.next}
          className="px-3 py-1 rounded-lg border hover:bg-gray-50 disabled:opacity-50"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
