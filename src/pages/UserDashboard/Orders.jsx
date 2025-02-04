import { Package, Search } from 'lucide-react';

// Dummy orders data
const orders = [
  {
    id: 'ORD-1234',
    date: 'Mar 14, 2024',
    status: 'Delivered',
    items: ['Wireless Headphones', 'USB-C Cable'],
    total: 899.0,
  },
  {
    id: 'ORD-1233',
    date: 'Mar 12, 2024',
    status: 'In Transit',
    items: ['Premium Laptop'],
    total: 1299.0,
  },
  {
    id: 'ORD-1232',
    date: 'Mar 10, 2024',
    status: 'Delivered',
    items: ['Smartphone Pro', 'Phone Case'],
    total: 949.0,
  },
];

export default function Orders() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Orders</h1>
        <div className="relative">
          <input
            type="text"
            placeholder="Search orders..."
            className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 text-left">
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                Order ID
              </th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                Date
              </th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                Items
              </th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                Status
              </th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                Total
              </th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b last:border-b-0">
                <td className="px-6 py-4 flex items-center">
                  <Package className="w-5 h-5 text-gray-400 mr-2" />
                  {order.id}
                </td>
                <td className="px-6 py-4">{order.date}</td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-600">
                    {order.items.join(', ')}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                    ${
                      order.status === 'Delivered'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4">${order.total.toLocaleString()}</td>
                <td className="px-6 py-4">
                  <button className="text-blue-600 hover:text-blue-800">
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
