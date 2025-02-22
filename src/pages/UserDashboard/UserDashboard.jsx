import { useState } from 'react';
import Orders from './Orders';
import Profile from './Profile';
import Settings from './Settings';
import Sidebar from './Sidebar';
import Wishlist from './Wishlist';

// Dummy user data
const userData = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  avatar: 'https://avatar.iran.liara.run/public',
  stats: {
    totalOrders: 12,
    wishlistItems: 8,
    totalSpent: 2890,
  },
};

export default function UserDashboard() {
  const [currentPage, setCurrentPage] = useState('history');

  const renderPage = () => {
    switch (currentPage) {
      case 'wishlist':
        return <Wishlist />;
      case 'orders':
        return <Orders />;
      case 'profile':
        return <Profile user={userData} />;
      case 'settings':
        return <Settings />;
      default:
        return <Wishlist />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar
        user={userData}
        currentPage={currentPage}
        onNavigate={setCurrentPage}
      />
      <main className="flex-1 p-8">{renderPage()}</main>
    </div>
  );
}
