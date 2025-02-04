import { ChevronLeft, ChevronRight } from 'lucide-react';

// Dummy orders data
const orders = [
  {
    id: '12345',
    date: 'March 15, 2024',
    status: 'Delivered',
    items: [
      {
        id: 1,
        name: 'Wireless Headphones',
        price: 129.99,
        quantity: 1,
        image: '/placeholder.svg',
      },
    ],
  },
  {
    id: '12344',
    date: 'March 10, 2024',
    status: 'In Transit',
    items: [
      {
        id: 2,
        name: 'Smart Watch',
        price: 199.99,
        quantity: 1,
        image: '/placeholder.svg',
      },
    ],
  },
  {
    id: '12343',
    date: 'March 5, 2024',
    status: 'Cancelled',
    items: [
      {
        id: 3,
        name: 'Bluetooth Speaker',
        price: 159.98,
        quantity: 2,
        image: '/placeholder.svg',
      },
    ],
  },
];

const StatusBadge = ({ status }) => {
  const styles = {
    Delivered: 'bg-green-100 text-green-600',
    'In Transit': 'bg-blue-100 text-blue-600',
    Cancelled: 'bg-gray-100 text-gray-600',
  };

  return (
    <span className={`px-3 py-1 rounded-full text-sm ${styles[status]}`}>
      {status}
    </span>
  );
};

export default function Orders() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">My Orders</h1>
        <p className="text-gray-600">View and track your order history</p>
      </div>

      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white rounded-lg shadow-sm overflow-hidden"
          >
            <div className="p-6 border-b">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-sm text-gray-600 mb-1">
                    Order #{order.id}
                  </div>
                  <div className="text-sm text-gray-600">
                    Placed on {order.date}
                  </div>
                </div>
                <StatusBadge status={order.status} />
              </div>
            </div>

            <div className="p-6">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image || '/placeholder.svg'}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg bg-gray-100"
                    />
                    <div>
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-gray-600">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">${item.price}</div>
                    {order.status === 'Delivered' && (
                      <button className="text-sm text-indigo-600 hover:text-indigo-700">
                        Write a Review
                      </button>
                    )}
                    {order.status === 'In Transit' && (
                      <button className="text-sm text-indigo-600 hover:text-indigo-700">
                        Track Order
                      </button>
                    )}
                    {order.status === 'Cancelled' && (
                      <button className="text-sm text-indigo-600 hover:text-indigo-700">
                        Buy Again
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-2 mt-8">
        <button className="px-3 py-1 rounded-lg border hover:bg-gray-50 text-gray-600">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button className="px-3 py-1 rounded-lg bg-indigo-600 text-white">
          1
        </button>
        <button className="px-3 py-1 rounded-lg hover:bg-gray-50">2</button>
        <button className="px-3 py-1 rounded-lg hover:bg-gray-50">3</button>
        <button className="px-3 py-1 rounded-lg border hover:bg-gray-50 text-gray-600">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
