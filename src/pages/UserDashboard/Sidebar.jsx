import { Heart, SettingsIcon, ShoppingBag, User } from 'lucide-react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

export default function Sidebar({ user }) {
  return (
    <div className="w-64 bg-white shadow-lg p-4">
      {/* User Profile Section */}
      <div className="flex items-center mb-8">
        <img
          src={user.avatar || 'https://avatar.iran.liara.run/public'}
          alt="User avatar"
          className="w-12 h-12 rounded-full mr-3"
        />
        <div>
          <h2 className="font-semibold text-lg">{user.name}</h2>
          <p className="text-sm text-gray-500">{user.email}</p>
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

Sidebar.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
  }).isRequired,
};
