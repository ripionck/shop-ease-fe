import { Camera, Mail, Phone, MapPin } from 'lucide-react';

export default function Profile({ user }) {
  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-col items-center">
          <div className="relative">
            <img
              src={user.avatar || '/placeholder.svg'}
              alt="Profile"
              className="w-32 h-32 rounded-full"
            />
            <button className="absolute bottom-0 right-0 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700">
              <Camera className="w-4 h-4" />
            </button>
          </div>
          <h1 className="mt-4 text-2xl font-semibold">{user.name}</h1>
          <p className="text-gray-500">{user.email}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow divide-y">
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4">Personal Information</h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p>{user.email}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p>+1 (555) 123-4567</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Address</p>
                <p>123 Main St, City, Country</p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4">Account Statistics</h2>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-semibold">{user.stats.totalOrders}</p>
              <p className="text-sm text-gray-500">Orders</p>
            </div>
            <div>
              <p className="text-2xl font-semibold">
                {user.stats.wishlistItems}
              </p>
              <p className="text-sm text-gray-500">Wishlist</p>
            </div>
            <div>
              <p className="text-2xl font-semibold">${user.stats.totalSpent}</p>
              <p className="text-sm text-gray-500">Spent</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
