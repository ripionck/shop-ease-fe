import { Search, ShoppingBag, Clock, Check, RotateCw } from 'lucide-react';
const orders = [
  {
    id: '#ORD-001',
    customer: {
      name: 'John Doe',
      email: 'john@example.com',
      avatar:
        'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-04%20042425-SJb5Hk9uejnYUwbNGLGYRco7RX0Dnl.png',
    },
    items: [
      {
        name: 'Wireless Headphones',
        quantity: 1,
        price: 199.99,
      },
    ],
    total: 299.99,
    status: 'New',
    date: '2024-02-20',
    shipping: {
      address: '123 Main St',
      apt: 'Apt 4B',
      city: 'New York',
      state: 'NY',
      zip: '10001',
    },
    phone: '+1 234 567 890',
  },
  {
    id: '#ORD-002',
    customer: {
      name: 'Jane Smith',
      email: 'jane@example.com',
      avatar:
        'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-04%20042425-SJb5Hk9uejnYUwbNGLGYRco7RX0Dnl.png',
    },
    items: [
      {
        name: 'Smart Watch',
        quantity: 1,
        price: 149.99,
      },
    ],
    total: 149.99,
    status: 'Processing',
    date: '2024-02-19',
    shipping: {
      address: '456 Oak St',
      apt: 'Unit 7',
      city: 'Brooklyn',
      state: 'NY',
      zip: '11201',
    },
    phone: '+1 234 567 891',
  },
];

const stats = [
  { label: 'New Orders', value: '25', icon: ShoppingBag, color: 'blue' },
  { label: 'Processing', value: '12', icon: Clock, color: 'orange' },
  { label: 'Shipped', value: '48', icon: RotateCw, color: 'green' },
  { label: 'Delivered', value: '156', icon: Check, color: 'gray' },
];

export default function Orders({ onOpenModal }) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Orders</h1>
        <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg">
          Export Orders
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat) => {
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

      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <div className="relative">
              <input
                type="text"
                placeholder="Search orders..."
                className="pl-10 pr-4 py-2 border rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            </div>
            <div className="flex items-center gap-4">
              <select className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>All Status</option>
                <option>New</option>
                <option>Processing</option>
                <option>Shipped</option>
                <option>Delivered</option>
              </select>
              <input
                type="date"
                className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

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
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="px-6 py-4">{order.id}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <img
                      src={order.customer.avatar || '/placeholder.svg'}
                      alt={order.customer.name}
                      className="w-8 h-8 rounded-full mr-3"
                    />
                    <div>
                      <div className="font-medium">{order.customer.name}</div>
                      <div className="text-sm text-gray-500">
                        {order.customer.email}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">{order.items.length} items</td>
                <td className="px-6 py-4">${order.total}</td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                    ${
                      order.status === 'New'
                        ? 'bg-blue-100 text-blue-800'
                        : order.status === 'Processing'
                        ? 'bg-orange-100 text-orange-800'
                        : order.status === 'Shipped'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4">{order.date}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => onOpenModal('orderDetails')}
                    className="text-blue-600 hover:text-blue-900"
                  >
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
