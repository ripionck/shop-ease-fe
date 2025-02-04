import { Lock, Heart, CreditCard } from 'lucide-react';

// Dummy data
const recentOrders = [
  { id: 'ORD-1234', date: 'Mar 14, 2024', status: 'Delivered', total: 899.0 },
  { id: 'ORD-1233', date: 'Mar 12, 2024', status: 'In Transit', total: 1299.0 },
];

const recentlyViewed = [
  { id: 1, name: 'Wireless Headphones', price: 299.99, icon: '🎧' },
  { id: 2, name: 'Premium Laptop', price: 1299.99, icon: '💻' },
  { id: 3, name: 'Smartphone Pro', price: 899.99, icon: '📱' },
];

export default function Dashboard({ user }) {
  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard
          title="Total Orders"
          value={user.stats.totalOrders}
          icon={<Lock className="w-5 h-5" />}
          iconBg="bg-blue-100"
          iconColor="text-blue-600"
        />
        <StatsCard
          title="Wishlist Items"
          value={user.stats.wishlistItems}
          icon={<Heart className="w-5 h-5" />}
          iconBg="bg-red-100"
          iconColor="text-red-600"
        />
        <StatsCard
          title="Total Spent"
          value={`$${user.stats.totalSpent.toLocaleString()}`}
          icon={<CreditCard className="w-5 h-5" />}
          iconBg="bg-green-100"
          iconColor="text-green-600"
        />
      </div>

      {/* Recent Orders */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
        <div className="bg-white rounded-lg shadow">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b">
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                  Order ID
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                  Date
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
              {recentOrders.map((order) => (
                <tr key={order.id} className="border-b last:border-b-0">
                  <td className="px-6 py-4">{order.id}</td>
                  <td className="px-6 py-4">{order.date}</td>
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
      </section>

      {/* Recently Viewed */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Recently Viewed</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recentlyViewed.map((item) => (
            <div key={item.id} className="bg-white p-6 rounded-lg shadow">
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="font-semibold mb-2">{item.name}</h3>
              <p className="text-gray-600">${item.price}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function StatsCard({ title, value, icon, iconBg, iconColor }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-semibold">{value}</p>
        </div>
        <div className={`p-3 rounded-full ${iconBg} ${iconColor}`}>{icon}</div>
      </div>
    </div>
  );
}
