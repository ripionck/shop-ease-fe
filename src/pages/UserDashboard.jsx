import { useState } from 'react';
import {
  Package,
  Heart,
  CreditCard,
  Settings,
  LogOut,
  Bell,
  ShoppingBag,
} from 'lucide-react';

// Dummy user data
const user = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  avatar: '/placeholder.svg',
  memberSince: 'March 2023',
};

// Dummy stats data
const stats = [
  { label: 'Total Orders', value: '12', icon: Package },
  { label: 'Wishlist Items', value: '8', icon: Heart },
  { label: 'Total Spent', value: '$2,890', icon: CreditCard },
];

// Dummy orders data
const recentOrders = [
  {
    id: 'ORD-1234',
    date: 'Mar 14, 2024',
    status: 'Delivered',
    total: 899.0,
    items: [
      {
        name: 'Wireless Headphones',
        price: 299.99,
        image: '/placeholder.svg',
      },
    ],
  },
  {
    id: 'ORD-1233',
    date: 'Mar 12, 2024',
    status: 'In Transit',
    total: 1299.0,
    items: [
      {
        name: 'Premium Laptop',
        price: 1299.99,
        image: '/placeholder.svg',
      },
    ],
  },
];

// Dummy notifications
const notifications = [
  {
    id: 1,
    message: 'Your order #ORD-1234 has been delivered',
    time: '2 hours ago',
    isRead: false,
  },
  {
    id: 2,
    message: 'New items added to your wishlist are on sale!',
    time: '1 day ago',
    isRead: true,
  },
];

const StatusBadge = ({ status }) => {
  const styles = {
    Delivered: 'bg-green-100 text-green-600',
    'In Transit': 'bg-blue-100 text-blue-600',
    Cancelled: 'bg-red-100 text-red-600',
  };

  return (
    <span className={`px-3 py-1 rounded-full text-sm ${styles[status]}`}>
      {status}
    </span>
  );
};

export default function UserDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-white p-6 rounded-lg shadow-sm border"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-indigo-100 rounded-full">
                      <stat.icon className="w-6 h-6 text-indigo-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">{stat.label}</p>
                      <p className="text-2xl font-bold">{stat.value}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Orders */}
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-6 border-b">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Recent Orders</h3>
                  <a
                    href="/orders"
                    className="text-sm text-indigo-600 hover:text-indigo-700"
                  >
                    View All
                  </a>
                </div>
              </div>
              <div className="divide-y">
                {recentOrders.map((order) => (
                  <div key={order.id} className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-sm text-gray-600">
                          Order #{order.id}
                        </p>
                        <p className="text-sm text-gray-600">{order.date}</p>
                      </div>
                      <StatusBadge status={order.status} />
                    </div>
                    {order.items.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center gap-4">
                          <img
                            src={item.image || '/placeholder.svg'}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-gray-600">
                              ${item.price.toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-6 border-b">
              <h3 className="text-lg font-semibold">Notifications</h3>
            </div>
            <div className="divide-y">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-6 flex items-start gap-4 ${
                    !notification.isRead ? 'bg-indigo-50' : ''
                  }`}
                >
                  <div
                    className={`p-2 rounded-full ${
                      !notification.isRead
                        ? 'bg-indigo-100 text-indigo-600'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    <Bell className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-900">{notification.message}</p>
                    <p className="text-sm text-gray-600">{notification.time}</p>
                  </div>
                  {!notification.isRead && (
                    <div className="w-2 h-2 rounded-full bg-indigo-600" />
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      case 'settings':
        return (
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-6 border-b">
              <h3 className="text-lg font-semibold">Account Settings</h3>
            </div>
            <div className="p-6">
              <div className="max-w-md space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    defaultValue={user.name}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    defaultValue={user.email}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <button className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* User Profile Header */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="flex items-center gap-6">
            <img
              src={user.avatar || '/placeholder.svg'}
              alt={user.name}
              className="w-20 h-20 rounded-full object-cover"
            />
            <div>
              <h1 className="text-2xl font-bold">{user.name}</h1>
              <p className="text-gray-600">{user.email}</p>
              <p className="text-sm text-gray-500">
                Member since {user.memberSince}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <nav className="space-y-1">
            <button
              onClick={() => setActiveTab('overview')}
              className={`flex items-center gap-3 w-full p-3 rounded-lg text-left ${
                activeTab === 'overview'
                  ? 'bg-indigo-50 text-indigo-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <ShoppingBag className="w-5 h-5" />
              <span>Overview</span>
            </button>
            <button
              onClick={() => setActiveTab('notifications')}
              className={`flex items-center gap-3 w-full p-3 rounded-lg text-left ${
                activeTab === 'notifications'
                  ? 'bg-indigo-50 text-indigo-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Bell className="w-5 h-5" />
              <span>Notifications</span>
              <span className="ml-auto bg-indigo-600 text-white text-xs px-2 py-1 rounded-full">
                2
              </span>
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`flex items-center gap-3 w-full p-3 rounded-lg text-left ${
                activeTab === 'settings'
                  ? 'bg-indigo-50 text-indigo-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Settings className="w-5 h-5" />
              <span>Settings</span>
            </button>
            <button className="flex items-center gap-3 w-full p-3 rounded-lg text-left text-red-600 hover:bg-red-50">
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </nav>

          {/* Main Content */}
          <div className="lg:col-span-3">{renderTabContent()}</div>
        </div>
      </div>
    </div>
  );
}
