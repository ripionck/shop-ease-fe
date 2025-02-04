export const orders = [
  {
    id: 'ORD-001',
    customer: {
      name: 'John Doe',
      email: 'john@example.com',
      avatar:
        'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-02%20170346-1KPK6ldEiFhlmTnYOlaaY0CUKHLCfg.png',
    },
    products: 2,
    total: 299.99,
    status: 'New',
    date: '2024-02-20',
  },
  {
    id: 'ORD-002',
    customer: {
      name: 'Jane Smith',
      email: 'jane@example.com',
      avatar:
        'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-02%20170346-1KPK6ldEiFhlmTnYOlaaY0CUKHLCfg.png',
    },
    products: 1,
    total: 149.99,
    status: 'Processing',
    date: '2024-02-19',
  },
];

// export const products = [
//   {
//     id: 'SKU001',
//     name: 'Wireless Headphones',
//     category: 'Electronics',
//     price: 99.99,
//     stock: 145,
//     image:
//       'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-02%20170254-K0pJF0BpMY7n2ERCNHubQ6YKxt5ybE.png',
//   },
// ];

export const inventory = [
  {
    sku: 'SKU001',
    product: 'Wireless Headphones',
    currentStock: 145,
    reorderPoint: 50,
    status: 'In Stock',
  },
  {
    sku: 'SKU002',
    product: 'Smart Watch',
    currentStock: 8,
    reorderPoint: 20,
    status: 'Low Stock',
  },
];

export const categories = [
  {
    name: 'Electronics',
    totalProducts: 124,
    activeProducts: 98,
    outOfStock: 26,
  },
  {
    name: 'Clothing',
    totalProducts: 89,
    activeProducts: 76,
    outOfStock: 13,
  },
];

export const orderStats = {
  new: 25,
  processing: 12,
  shipped: 48,
  delivered: 156,
};

export const inventoryStats = {
  total: 1234,
  lowStock: 28,
  outOfStock: 12,
};

export const transactions = [
  {
    id: 'TRX-001',
    type: 'Sale',
    amount: 299.99,
    status: 'Completed',
    customer: 'John Doe',
    date: '2024-02-20',
    paymentMethod: 'Credit Card',
  },
  {
    id: 'TRX-002',
    type: 'Refund',
    amount: -149.99,
    status: 'Completed',
    customer: 'Jane Smith',
    date: '2024-02-19',
    paymentMethod: 'Credit Card',
  },
  {
    id: 'TRX-003',
    type: 'Sale',
    amount: 599.99,
    status: 'Pending',
    customer: 'Mike Johnson',
    date: '2024-02-18',
    paymentMethod: 'PayPal',
  },
];
