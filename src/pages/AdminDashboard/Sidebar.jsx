import {
  Package,
  Archive,
  ShoppingBag,
  BarChart2,
  DollarSign,
} from 'lucide-react';

export default function Sidebar({ currentPage, onNavigate }) {
  const navItems = [
    { id: 'analytics', label: 'Analytics', icon: BarChart2 },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'inventory', label: 'Inventory', icon: Archive },
    { id: 'orders', label: 'Orders', icon: ShoppingBag },
    { id: 'transactions', label: 'Transactions', icon: DollarSign },
  ];

  return (
    <aside className="w-64 bg-white min-h-screen p-6 border-r">
      <h1 className="text-xl font-bold mb-8">Admin</h1>
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
