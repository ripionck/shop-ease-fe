import axios from 'axios';
import { CreditCard, Trash } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import EditAddressModal from './EditAddressModal';

const getAccessToken = () => localStorage.getItem('access_token');

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/v1/',
  headers: {
    Authorization: `Bearer ${getAccessToken()}`,
  },
});

export default function Profile() {
  const [profile, setProfile] = useState({
    username: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    country: '',
    zip_code: '',
    image: null,
  });
  const [showEditAddressModal, setShowEditAddressModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get('/profile/');
        const {
          username,
          email,
          phone_number,
          street,
          city,
          state,
          country,
          zip_code,
          image,
        } = response.data;
        setProfile({
          username,
          email,
          phone: phone_number,
          street,
          city,
          state,
          country,
          zip_code,
          image,
        });
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch profile');
        toast.error('Failed to fetch profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleInfoChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSaveProfile = async () => {
    try {
      await api.patch('/profile/', {
        username: profile.username,
        email: profile.email,
        phone_number: profile.phone,
        street: profile.street,
        city: profile.city,
        state: profile.state,
        country: profile.country,
        zip_code: profile.zip_code,
      });
      toast.success('Profile updated successfully');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update profile');
    }
  };

  const handleEditAddress = () => {
    setShowEditAddressModal(true);
  };

  const handleCloseModal = () => {
    setShowEditAddressModal(false);
  };

  const handleSaveAddress = async (updatedAddress) => {
    try {
      await api.patch('/profile/', updatedAddress);
      toast.success('Address updated successfully');
      setShowEditAddressModal(false);
      // Refresh profile data
      const response = await api.get('/profile/');
      setProfile({
        ...profile,
        street: response.data.street,
        city: response.data.city,
        state: response.data.state,
        country: response.data.country,
        zip_code: response.data.zip_code,
      });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update address');
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );

  if (error)
    return <div className="text-center p-8 text-red-600">Error: {error}</div>;

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8">
      {/* Profile Header */}
      <div className="flex items-start gap-6">
        <div className="relative">
          <img
            src={profile.image || 'https://avatar.iran.liara.run/public'}
            alt="Profile"
            className="w-24 h-24 rounded-full"
          />
          <button className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-4 py-2 bg-indigo-500 text-white text-sm rounded-lg hover:bg-indigo-600">
            Change Photo
          </button>
        </div>
        <div>
          <h1 className="text-2xl font-semibold">{profile.username}</h1>
          <p className="text-gray-500">Member since October 2023</p>
        </div>
      </div>

      {/* Personal Information */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Personal Information</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={profile.username}
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
              value={profile.email}
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
              value={profile.phone}
              onChange={handleInfoChange}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
        <div className="flex justify-end">
          <button
            onClick={handleSaveProfile}
            className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600"
          >
            Save Changes
          </button>
        </div>
      </div>

      {/* Delivery Address */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Delivery Address</h2>
          <button
            onClick={handleEditAddress}
            className="text-indigo-500 hover:text-indigo-600"
          >
            Edit Address
          </button>
        </div>
        <div className="p-4 border rounded-lg">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-600">{profile.street}</p>
              <p className="text-gray-600">
                {profile.city}, {profile.state} {profile.zip_code}
              </p>
              <p className="text-gray-600">{profile.country}</p>
            </div>
          </div>
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

      {showEditAddressModal && (
        <EditAddressModal
          onClose={handleCloseModal}
          onSave={handleSaveAddress}
          initialData={{
            street: profile.street,
            city: profile.city,
            state: profile.state,
            country: profile.country,
            zip_code: profile.zip_code,
          }}
        />
      )}
    </div>
  );
}
