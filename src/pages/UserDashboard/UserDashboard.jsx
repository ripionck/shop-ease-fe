import { useState } from 'react';
import Dashboard from './Dashboard';
import Orders from './Orders';
import Wishlist from '../Wishlist';
import Profile from './Profile';
import Settings from './Settings';
import Sidebar from './Sidebar';

// Dummy user data
const userData = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  avatar:
    'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-02%20021454-bkUgDoLjzbZ4DybRGJvJ6yy67ZgdPs.png',
  stats: {
    totalOrders: 12,
    wishlistItems: 8,
    totalSpent: 2890,
  },
};

export default function UserDashboard() {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard user={userData} />;
      case 'orders':
        return <Orders />;
      case 'wishlist':
        return <Wishlist />;
      case 'profile':
        return <Profile user={userData} />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard user={userData} />;
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
