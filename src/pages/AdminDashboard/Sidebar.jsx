import { Box, ClipboardList, CreditCard, List, Package } from 'lucide-react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

export default function Sidebar() {
  const { user } = useAuth();

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
          to="/admin/products"
          className={({ isActive }) =>
            `flex items-center p-2 rounded mb-2 ${
              isActive
                ? 'bg-blue-100 text-blue-600'
                : 'text-gray-700 hover:bg-gray-100'
            }`
          }
        >
          <Package className="w-5 h-5 mr-3" />
          Products
        </NavLink>

        <NavLink
          to="/admin/categories"
          className={({ isActive }) =>
            `flex items-center p-2 rounded mb-2 ${
              isActive
                ? 'bg-blue-100 text-blue-600'
                : 'text-gray-700 hover:bg-gray-100'
            }`
          }
        >
          <List className="w-5 h-5 mr-3" />
          Categories
        </NavLink>

        <NavLink
          to="/admin/inventory"
          className={({ isActive }) =>
            `flex items-center p-2 rounded mb-2 ${
              isActive
                ? 'bg-blue-100 text-blue-600'
                : 'text-gray-700 hover:bg-gray-100'
            }`
          }
        >
          <Box className="w-5 h-5 mr-3" />
          Inventory
        </NavLink>

        <NavLink
          to="/admin/orders"
          className={({ isActive }) =>
            `flex items-center p-2 rounded mb-2 ${
              isActive
                ? 'bg-blue-100 text-blue-600'
                : 'text-gray-700 hover:bg-gray-100'
            }`
          }
        >
          <ClipboardList className="w-5 h-5 mr-3" />
          Orders
        </NavLink>

        <NavLink
          to="/admin/transactions"
          className={({ isActive }) =>
            `flex items-center p-2 rounded mb-2 ${
              isActive
                ? 'bg-blue-100 text-blue-600'
                : 'text-gray-700 hover:bg-gray-100'
            }`
          }
        >
          <CreditCard className="w-5 h-5 mr-3" />
          Transactions
        </NavLink>
      </nav>
    </div>
  );
}

Sidebar.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string,
    email: PropTypes.string,
    image: PropTypes.string,
    role: PropTypes.oneOf(['admin', 'user']),
  }),
};

Sidebar.defaultProps = {
  user: null,
};
