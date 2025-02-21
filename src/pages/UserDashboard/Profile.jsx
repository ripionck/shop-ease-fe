import { CreditCard, Pencil, Trash } from 'lucide-react';
import { useState } from 'react';
import AddAddressModal from './AddAddressModal';

export default function Profile() {
  const [personalInfo, setPersonalInfo] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 234 567 890',
  });
  const [showAddAddressModal, setShowAddAddressModal] = useState(false);

  const addresses = [
    {
      id: 1,
      type: 'Home',
      street: '123 Main Street, Apt 4B',
      city: 'New York',
      state: 'NY',
      zip: '10001',
    },
    {
      id: 2,
      type: 'Work',
      street: '456 Business Ave',
      city: 'New York',
      state: 'NY',
      zip: '10002',
    },
  ];

  const handleInfoChange = (e) => {
    setPersonalInfo({
      ...personalInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddAddress = () => {
    setShowAddAddressModal(true);
  };

  const handleCloseModal = () => {
    setShowAddAddressModal(false);
  };

  const handleSaveAddress = (newAddress) => {
    // Handle saving the new address
    setShowAddAddressModal(false);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8">
      {/* Profile Header */}
      <div className="flex items-start gap-6">
        <div className="relative">
          <img
            src="https://avatar.iran.liara.run/public"
            alt="Profile"
            className="w-24 h-24 rounded-full"
          />
          <button className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-4 py-2 bg-indigo-500 text-white text-sm rounded-lg hover:bg-indigo-600">
            Change Photo
          </button>
        </div>
        <div>
          <h1 className="text-2xl font-semibold">John Doe</h1>
          <p className="text-gray-500">Member since October 2023</p>
        </div>
      </div>

      {/* Personal Information */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Personal Information</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              value={personalInfo.firstName}
              onChange={handleInfoChange}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              value={personalInfo.lastName}
              onChange={handleInfoChange}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={personalInfo.email}
              onChange={handleInfoChange}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone
            </label>
            <input
              type="tel"
              name="phone"
              value={personalInfo.phone}
              onChange={handleInfoChange}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
        <div className="flex justify-end">
          <button className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600">
            Save Changes
          </button>
        </div>
      </div>

      {/* Delivery Addresses */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Delivery Addresses</h2>
          <button
            onClick={handleAddAddress}
            className="text-indigo-500 hover:text-indigo-600"
          >
            Add New Address
          </button>
        </div>
        <div className="space-y-4">
          {addresses.map((address) => (
            <div key={address.id} className="p-4 border rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{address.type}</h3>
                  <p className="text-gray-600">{address.street}</p>
                  <p className="text-gray-600">
                    {address.city}, {address.state} {address.zip}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 text-gray-500 hover:text-gray-700">
                    <Pencil className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-500 hover:text-gray-700">
                    <Trash className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Methods */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Payment Methods</h2>
          <button className="text-indigo-500 hover:text-indigo-600">
            Add New Card
          </button>
        </div>
        <div className="p-4 border rounded-lg">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <CreditCard className="w-6 h-6 text-gray-500" />
              <div>
                <p className="font-medium">Visa ending in 4242</p>
                <p className="text-sm text-gray-500">Expires 12/24</p>
              </div>
            </div>
            <button className="p-2 text-gray-500 hover:text-gray-700">
              <Trash className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Add Address Modal */}
      {showAddAddressModal && (
        <AddAddressModal
          onClose={handleCloseModal}
          onSave={handleSaveAddress}
        />
      )}
    </div>
  );
}
