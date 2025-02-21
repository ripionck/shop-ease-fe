import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import AddCategoryModal from './AddCategoryModal';
import AddProductModal from './AddProductModal';
import Analytics from './Analytics';
import Categories from './Categories';
import Inventory from './Inventory';
import OrderDetailsModal from './OrderDetailsModal';
import Orders from './Orders';
import Products from './Products';
import Sidebar from './Sidebar';
import Transactions from './Transactions';
import UpdateStockModal from './UpdateStockModal';

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

export default function AdminDashboard() {
  const [activeModal, setActiveModal] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  // const location = useLocation(); // Use useLocation to check the current path

  const closeModal = () => {
    setActiveModal(null);
    setSelectedItem(null);
  };

  const openModal = (modalName, item = null) => {
    setActiveModal(modalName);
    setSelectedItem(item);
  };

  // // Redirect to /admin/analytics if the path is /admin
  // if (location.pathname === '/admin') {
  //   return <Navigate to="/admin/analytics" replace />;
  // }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Left Side - Sidebar */}
      <Sidebar user={userData} />

      {/* Right Side - Content */}
      <main className="flex-1 p-8">
        <Routes>
          <Route path="analytics" element={<Analytics />} />
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
