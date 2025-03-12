import { Heart, SettingsIcon, ShoppingBag, User } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

export default function Sidebar() {
  const { user } = useAuth();
  console.log(user);
  return (
    <div className="w-64 bg-white shadow-lg p-4">
      {/* User Profile Section */}
      <div className="flex items-center mb-8">
        <img
          src={user?.image || 'https://avatar.iran.liara.run/public'}
          alt="User"
          className="w-12 h-12 rounded-full mr-3 object-cover"
        />
        <div>
          <h2 className="font-semibold text-lg">{user.username}</h2>
          <p className="text-sm text-gray-500">{user.email}</p>
          <p className="text-xs text-blue-600 mt-1">
            {user.role === 'admin' ? 'Administrator' : 'Registered User'}
          </p>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="mt-8">
        <NavLink
          to="/user/orders"
          className={({ isActive }) =>
            `flex items-center p-2 rounded mb-2 ${
              isActive
                ? 'bg-blue-100 text-blue-600'
                : 'text-gray-700 hover:bg-gray-100'
            }`
          }
        >
          <ShoppingBag className="w-5 h-5 mr-3" />
          Orders
        </NavLink>

        <NavLink
          to="/user/wishlist"
          className={({ isActive }) =>
            `flex items-center p-2 rounded mb-2 ${
              isActive
                ? 'bg-blue-100 text-blue-600'
                : 'text-gray-700 hover:bg-gray-100'
            }`
          }
        >
          <Heart className="w-5 h-5 mr-3" />
          Wishlist
        </NavLink>

        <NavLink
          to="/user/profile"
          className={({ isActive }) =>
            `flex items-center p-2 rounded mb-2 ${
              isActive
                ? 'bg-blue-100 text-blue-600'
                : 'text-gray-700 hover:bg-gray-100'
            }`
          }
        >
          <User className="w-5 h-5 mr-3" />
          Profile
        </NavLink>

        <NavLink
          to="/user/settings"
          className={({ isActive }) =>
            `flex items-center p-2 rounded mb-2 ${
              isActive
                ? 'bg-blue-100 text-blue-600'
                : 'text-gray-700 hover:bg-gray-100'
            }`
          }
        >
          <SettingsIcon className="w-5 h-5 mr-3" />
          Settings
        </NavLink>
      </nav>
    </div>
  );
}
