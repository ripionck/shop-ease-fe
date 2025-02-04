import { Pencil, Trash } from 'lucide-react';

export default function Categories({ onOpenModal }) {
  const categories = [
    {
      id: 1,
      name: 'Electronics',
      totalProducts: 124,
      activeProducts: 98,
      outOfStock: 26,
    },
    {
      id: 2,
      name: 'Clothing',
      totalProducts: 89,
      activeProducts: 76,
      outOfStock: 13,
    },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Categories</h1>
        <button
          onClick={() => onOpenModal('addCategory')}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Add Category
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((category) => (
          <div key={category.id} className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {category.name}
                </h2>
                <p className="text-gray-500">
                  {category.totalProducts} products
                </p>
              </div>
              <div className="flex gap-2">
                <button className="p-2 text-blue-600 hover:text-blue-700">
                  <Pencil className="w-5 h-5" />
                </button>
                <button className="p-2 text-red-600 hover:text-red-700">
                  <Trash className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Active Products</span>
                <span className="text-green-600">
                  {category.activeProducts}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Out of Stock</span>
                <span className="text-red-600">{category.outOfStock}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
