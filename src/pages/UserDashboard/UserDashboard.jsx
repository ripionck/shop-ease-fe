import { Route, Routes } from 'react-router-dom';
import Sidebar from './Sidebar';
import Orders from './Orders';
import Wishlist from './Wishlist';
import Profile from './Profile';
import Settings from './Settings';

// Dummy user data
const userData = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  avatar: 'https://avatar.iran.liara.run/public',
};

export default function UserDashboard() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Left Side - Sidebar */}
      <Sidebar user={userData} />

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
