import { useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Spinner from '../../components/Spinner';
import useAuth from '../../hooks/useAuth';
import AddCategoryModal from './AddCategoryModal';
import AddProductModal from './AddProductModal';
import Categories from './Categories';
import Inventory from './Inventory';
import OrderDetailsModal from './OrderDetailsModal';
import Orders from './Orders';
import Products from './Products';
import Sidebar from './Sidebar';
import Transactions from './Transactions';
import UpdateStockModal from './UpdateStockModal';

export default function AdminDashboard() {
  const { loading, isLoggedIn, user } = useAuth();

  const [activeModal, setActiveModal] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  const closeModal = () => {
    setActiveModal(null);
    setSelectedItem(null);
  };

  const openModal = (modalName, item = null) => {
    setActiveModal(modalName);
    setSelectedItem(item);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (!isLoggedIn || !user || user.role !== 'admin') {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Left Side - Sidebar */}
      <Sidebar />

      {/* Right Side - Content */}
      <main className="flex-1 p-8">
        <Routes>
          <Route
            path="products"
            element={<Products onOpenModal={openModal} />}
          />
          <Route
            path="categories"
            element={<Categories onOpenModal={openModal} />}
          />
          <Route
            path="inventory"
            element={<Inventory onOpenModal={openModal} />}
          />
          <Route path="orders" element={<Orders onOpenModal={openModal} />} />
          <Route path="transactions" element={<Transactions />} />
        </Routes>
      </main>

      {/* Modals */}
      {activeModal === 'updateStock' && (
        <UpdateStockModal
          isOpen={true}
          onClose={closeModal}
          item={selectedItem}
        />
      )}

      {activeModal === 'orderDetails' && (
        <OrderDetailsModal
          isOpen={true}
          onClose={closeModal}
          order={selectedItem}
        />
      )}

      {activeModal === 'addCategory' && (
        <AddCategoryModal isOpen={true} onClose={closeModal} />
      )}

      {activeModal === 'addProduct' && (
        <AddProductModal isOpen={true} onClose={closeModal} />
      )}
    </div>
  );
}
