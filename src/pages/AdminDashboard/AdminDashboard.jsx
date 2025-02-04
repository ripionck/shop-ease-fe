import { useState } from 'react';
import Sidebar from './Sidebar';
import Products from './Products';
import Inventory from './Inventory';
import Orders from './Orders';
import UpdateStockModal from './UpdateStockModal';
import OrderDetailsModal from './OrderDetailsModal';
import AddCategoryModal from './AddCategoryModal';
import AddProductModal from './AddProductModal';
import Analytics from './Analytics';
import Transactions from './Transactions';

export default function AdminDashboard() {
  const [currentPage, setCurrentPage] = useState('analytics');
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

  const renderPage = () => {
    switch (currentPage) {
      case 'analytics':
        return <Analytics />;
      case 'products':
        return <Products onOpenModal={openModal} />;
      case 'inventory':
        return <Inventory onOpenModal={openModal} />;
      case 'orders':
        return <Orders onOpenModal={openModal} />;
      case 'transactions':
        return <Transactions />;
      default:
        return <Analytics />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} />
      <main className="flex-1 p-8">{renderPage()}</main>

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
