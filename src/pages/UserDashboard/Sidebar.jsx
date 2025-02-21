import { Heart, History, SettingsIcon, ShoppingBag, User } from 'lucide-react';

export default function Sidebar({ user, currentPage, onNavigate }) {
  const navItems = [
    { id: 'history', label: 'History', icon: History },
    { id: 'orders', label: 'Orders', icon: ShoppingBag },
    { id: 'wishlist', label: 'Wishlist', icon: Heart },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: SettingsIcon },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 p-6">
      <div className="flex flex-col items-center mb-8">
        <div className="relative w-24 h-24 mb-4">
          <img
            src={user.avatar || '/placeholder.svg'}
            alt="Profile"
            className="rounded-full"
          />
          <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 border-4 border-white rounded-full" />
        </div>
        <h2 className="text-lg font-semibold">{user.name}</h2>
        <p className="text-sm text-gray-500">{user.email}</p>
      </div>

      <nav className="space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex items-center w-full px-4 py-3 text-sm rounded-lg transition-colors
                ${
                  currentPage === item.id
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
            >
              <Icon className="w-5 h-5 mr-3" />
              {item.label}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
