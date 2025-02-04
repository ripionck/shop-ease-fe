import { DollarSign, Users, ShoppingCart, TrendingUp } from 'lucide-react';

// Dummy data
const revenueData = [
  { month: 'Jan', revenue: 12500 },
  { month: 'Feb', revenue: 18200 },
  { month: 'Mar', revenue: 22800 },
  { month: 'Apr', revenue: 25400 },
  { month: 'May', revenue: 28900 },
  { month: 'Jun', revenue: 32100 },
];

const topProducts = [
  { name: 'Wireless Headphones', sales: 245, revenue: 24500 },
  { name: 'Smart Watch', sales: 190, revenue: 37800 },
  { name: 'Bluetooth Speaker', sales: 175, revenue: 13125 },
  { name: 'Laptop Stand', sales: 165, revenue: 8250 },
];

export default function Analytics() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Analytics Overview</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-600">Total Revenue</p>
              <p className="text-2xl font-semibold">$128,900</p>
              <p className="text-sm text-green-600">+12.5% from last month</p>
            </div>
            <div className="p-3 bg-green-100 text-green-600 rounded-full">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-600">Total Customers</p>
              <p className="text-2xl font-semibold">2,450</p>
              <p className="text-sm text-green-600">+8.2% from last month</p>
            </div>
            <div className="p-3 bg-blue-100 text-blue-600 rounded-full">
              <Users className="w-5 h-5" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-600">Total Orders</p>
              <p className="text-2xl font-semibold">1,280</p>
              <p className="text-sm text-green-600">+15.3% from last month</p>
            </div>
            <div className="p-3 bg-purple-100 text-purple-600 rounded-full">
              <ShoppingCart className="w-5 h-5" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-600">Average Order Value</p>
              <p className="text-2xl font-semibold">$142</p>
              <p className="text-sm text-green-600">+5.8% from last month</p>
            </div>
            <div className="p-3 bg-orange-100 text-orange-600 rounded-full">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>

      {/* Revenue Chart */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Revenue Trend</h2>
        <div className="h-64">
          <div className="flex h-full items-end space-x-2">
            {revenueData.map((data) => (
              <div
                key={data.month}
                className="flex-1 flex flex-col items-center"
              >
                <div
                  className="w-full bg-blue-500 rounded-t"
                  style={{
                    height: `${(data.revenue / 35000) * 100}%`,
                    transition: 'height 0.3s ease-in-out',
                  }}
                />
                <div className="text-sm mt-2">{data.month}</div>
                <div className="text-xs text-gray-500">
                  ${(data.revenue / 1000).toFixed(1)}k
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Products Table */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold">Top Performing Products</h2>
        </div>
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Product Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Total Sales
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Revenue
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Trend
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {topProducts.map((product, index) => (
              <tr key={index}>
                <td className="px-6 py-4">{product.name}</td>
                <td className="px-6 py-4">{product.sales}</td>
                <td className="px-6 py-4">
                  ${product.revenue.toLocaleString()}
                </td>
                <td className="px-6 py-4">
                  <div className="w-24 h-8 flex items-center">
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-green-500 rounded-full"
                        style={{ width: `${(product.sales / 300) * 100}%` }}
                      />
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
