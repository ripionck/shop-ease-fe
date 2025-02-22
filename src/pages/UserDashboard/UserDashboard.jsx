import { Route, Routes } from 'react-router-dom';
import Orders from './Orders';
import Profile from './Profile';
import Settings from './Settings';
import Sidebar from './Sidebar';
import Wishlist from './Wishlist';

export default function UserDashboard() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Left Side - Sidebar */}
      <Sidebar />

      {/* Right Side - Content */}
      <main className="flex-1 p-8">
        <Routes>
          <Route path="orders" element={<Orders />} />
          <Route path="wishlist" element={<Wishlist />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
        </Routes>
      </main>
    </div>
  );
}
