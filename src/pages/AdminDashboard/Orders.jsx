import axios from 'axios';
import { Check, Clock, RotateCw, ShoppingBag } from 'lucide-react';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const accessToken = localStorage.getItem('access_token');

const api = axios.create({
  baseURL: 'https://shop-ease-3oxf.onrender.com/api/v1/',
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
});

export default function Orders({ onOpenModal }) {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    newOrders: 0,
    processing: 0,
    shipped: 0,
    delivered: 0,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(10);
  const [selectedStatus, setSelectedStatus] = useState('All Status');
  const [selectedDate, setSelectedDate] = useState('');

  // Fetch orders and calculate stats
  const fetchOrders = async () => {
    try {
      const response = await api.get('/orders/');
      setOrders(response.data.orders);
      setFilteredOrders(response.data.orders);
      calculateStats(response.data.orders);
    } catch (err) {
      handleFetchError(err);
    } finally {
      setLoading(false);
    }
  };

  // Calculate stats based on orders
  const calculateStats = (orders) => {
    const newOrders = orders.filter(
      (order) => order.status === 'pending',
    ).length;
    const processing = orders.filter(
      (order) => order.status === 'processing',
    ).length;
    const shipped = orders.filter((order) => order.status === 'shipped').length;
    const delivered = orders.filter(
      (order) => order.status === 'delivered',
    ).length;

    setStats({ newOrders, processing, shipped, delivered });
  };

  const handleFetchError = (err) => {
    setError(err.response?.data?.message || 'Failed to fetch orders');
    toast.error('Failed to fetch orders');
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Update filters whenever status or date changes
  useEffect(() => {
    let filtered = orders;

    if (selectedStatus !== 'All Status') {
      filtered = filtered.filter(
        (order) => order.status === selectedStatus.toLowerCase(),
      );
    }

    if (selectedDate) {
      filtered = filtered.filter(
        (order) =>
          new Date(order.created_at).toISOString().split('T')[0] ===
          selectedDate,
      );
    }

    setFilteredOrders(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [selectedStatus, selectedDate, orders]);

  // Update order status
  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      await api.patch(`/orders/${orderId}/status/`, { status: newStatus });
      toast.success('Order status updated successfully');
      fetchOrders(); // Refresh orders after update
    } catch (err) {
      toast.error(
        err.response?.data?.message || 'Failed to update order status',
      );
    }
  };

  // Pagination logic
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(
    indexOfFirstOrder,
    indexOfLastOrder,
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Export all filtered orders
  const handleExport = async () => {
    try {
      const response = await api.get('/orders/', {
        params: {
          status: selectedStatus !== 'All Status' ? selectedStatus : undefined,
          date: selectedDate,
        },
      });

      // Here you would typically handle the export logic
      console.log('Exporting orders:', response.data.orders);
      toast.success('Export initiated successfully');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to export orders');
    }
  };

  // Loading and error states
  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );

  if (error)
    return <div className="text-center p-8 text-red-600">Error: {error}</div>;

  return (
    <div className="space-y-6">
      {/* Header and Export Button */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Orders</h1>
        <button
          onClick={handleExport}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
        >
          Export Orders
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          {
            label: 'New Orders',
            value: stats.newOrders,
            icon: ShoppingBag,
            color: 'blue',
          },
          {
            label: 'Processing',
            value: stats.processing,
            icon: Clock,
            color: 'orange',
          },
          {
            label: 'Shipped',
            value: stats.shipped,
            icon: RotateCw,
            color: 'green',
          },
          {
            label: 'Delivered',
            value: stats.delivered,
            icon: Check,
            color: 'gray',
          },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white p-6 rounded-lg shadow">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <p
                    className={`text-2xl font-semibold ${
                      stat.color === 'orange'
                        ? 'text-orange-600'
                        : stat.color === 'green'
                        ? 'text-green-600'
                        : stat.color === 'blue'
                        ? 'text-blue-600'
                        : 'text-gray-900'
                    }`}
                  >
                    {stat.value}
                  </p>
                </div>
                <div
                  className={`p-3 rounded-full
                  ${
                    stat.color === 'orange'
                      ? 'bg-orange-100 text-orange-600'
                      : stat.color === 'green'
                      ? 'bg-green-100 text-green-600'
                      : stat.color === 'blue'
                      ? 'bg-blue-100 text-blue-600'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Filters */}
      <div className="p-4 border-b">
        <div className="flex items-center gap-4">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option>All Status</option>
            <option>Pending</option>
            <option>Processing</option>
            <option>Shipped</option>
            <option>Delivered</option>
          </select>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Order ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Products
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Total
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currentOrders.map((order) => (
              <tr key={order.id}>
                <td className="px-6 py-4"># {order.id}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div>
                      <div className="font-medium">
                        {order.shipping_address.first_name}{' '}
                        {order.shipping_address.last_name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {order.shipping_address.street_address},{' '}
                        {order.shipping_address.city},{' '}
                        {order.shipping_address.state}{' '}
                        {order.shipping_address.zip_code}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  {order.items.map((item) => (
                    <div
                      key={item.product_id}
                      className="flex items-center gap-2"
                    >
                      <img
                        src={item.product_image || '/placeholder.svg'}
                        alt={item.product_name}
                        className="w-8 h-8 rounded"
                      />
                      <div>
                        <p className="font-medium">{item.product_name}</p>
                        <p className="text-sm text-gray-500">
                          Qty: {item.quantity}
                        </p>
                      </div>
                    </div>
                  ))}
                </td>
                <td className="px-6 py-4">${order.total_amount}</td>
                <td className="px-6 py-4">
                  <select
                    value={order.status}
                    onChange={(e) =>
                      updateOrderStatus(order.id, e.target.value)
                    }
                    className={`px-2 py-1 rounded-full text-xs font-medium
                    ${
                      order.status === 'pending'
                        ? 'bg-blue-100 text-blue-800'
                        : order.status === 'processing'
                        ? 'bg-orange-100 text-orange-800'
                        : order.status === 'shipped'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
                <td className="px-6 py-4">
                  {new Date(order.created_at).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => onOpenModal('orderDetails', order)}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-center items-center p-4">
          {Array.from(
            { length: Math.ceil(filteredOrders.length / ordersPerPage) },
            (_, i) => (
              <button
                key={i + 1}
                onClick={() => paginate(i + 1)}
                className={`mx-1 px-3 py-1 rounded ${
                  currentPage === i + 1
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700'
                }`}
              >
                {i + 1}
              </button>
            ),
          )}
        </div>
      </div>
    </div>
  );
}

Orders.propTypes = {
  onOpenModal: PropTypes.func.isRequired,
};
