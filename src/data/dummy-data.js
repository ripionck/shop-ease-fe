// Dummy data for the admin dashboard
export const orders = [
  {
    id: 'ORD-001',
    customer: {
      name: 'John Doe',
      email: 'john@example.com',
      avatar: '/placeholder.svg',
    },
    date: '2024-02-20',
    status: 'New',
    items: 2,
    total: 299.99,
  },
  {
    id: 'ORD-002',
    customer: {
      name: 'Jane Smith',
      email: 'jane@example.com',
      avatar: '/placeholder.svg',
    },
    date: '2024-02-19',
    status: 'Processing',
    items: 1,
    total: 149.99,
  },
  // Add more orders as needed
];

export const products = [
  {
    id: 'SKU001',
    name: 'Wireless Headphones',
    category: 'Electronics',
    price: 99.99,
    stock: 145,
    reorderPoint: 50,
    status: 'In Stock',
    image: '/placeholder.svg',
  },
  {
    id: 'SKU002',
    name: 'Smart Watch',
    category: 'Electronics',
    price: 199.99,
    stock: 8,
    reorderPoint: 20,
    status: 'Low Stock',
    image: '/placeholder.svg',
  },
  // Add more products as needed
];

export const categories = [
  {
    id: 1,
    name: 'Electronics',
    description: 'Electronic devices and accessories',
    totalProducts: 124,
    activeProducts: 98,
    outOfStock: 26,
    icon: '/placeholder.svg',
  },
  {
    id: 2,
    name: 'Clothing',
    description: 'Fashion and apparel',
    totalProducts: 89,
    activeProducts: 76,
    outOfStock: 13,
    icon: '/placeholder.svg',
  },
  // Add more categories as needed
];

export const dashboardStats = {
  orders: {
    new: 25,
    processing: 12,
    shipped: 48,
    delivered: 156,
  },
  inventory: {
    totalItems: 1234,
    lowStock: 28,
    outOfStock: 12,
  },
  revenue: {
    daily: 2500,
    weekly: 15000,
    monthly: 65000,
  },
};
