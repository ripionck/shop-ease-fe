import {
  Smartphone,
  Shirt,
  Home,
  Flower2,
  ShoppingBasketIcon as Basketball,
  BookOpen,
  Gamepad2,
  MoreHorizontal,
  ArrowRight,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const categories = [
  {
    id: '1',
    name: 'Electronics',
    description: 'Phones, Laptops & More',
    icon: Smartphone,
    color: 'text-blue-500',
    bgColor: 'bg-blue-50',
  },
  {
    id: '2',
    name: 'Fashion',
    description: 'Clothing, Shoes & Accessories',
    icon: Shirt,
    color: 'text-pink-500',
    bgColor: 'bg-pink-50',
  },
  {
    id: '3',
    name: 'Home & Living',
    description: 'Furniture & Decor',
    icon: Home,
    color: 'text-green-500',
    bgColor: 'bg-green-50',
  },
  {
    id: '4',
    name: 'Beauty',
    description: 'Makeup & Skincare',
    icon: Flower2,
    color: 'text-purple-500',
    bgColor: 'bg-purple-50',
  },
  {
    id: '5',
    name: 'Sports',
    description: 'Equipment & Gear',
    icon: Basketball,
    color: 'text-red-500',
    bgColor: 'bg-red-50',
  },
  {
    id: '6',
    name: 'Books',
    description: 'Fiction & Non-Fiction',
    icon: BookOpen,
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-50',
  },
  {
    id: '7',
    name: 'Toys & Games',
    description: 'For All Ages',
    icon: Gamepad2,
    color: 'text-indigo-500',
    bgColor: 'bg-indigo-50',
  },
  {
    id: '8',
    name: 'More',
    description: 'Explore All Categories',
    icon: MoreHorizontal,
    color: 'text-gray-500',
    bgColor: 'bg-gray-50',
  },
];

export default function CategorySection() {
  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Shop by Category</h2>
          <p className="mt-4 text-lg text-gray-500">
            Explore our wide range of categories and find exactly what
            you&apos;re looking for
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <div
                key={category.id}
                className={`${category.bgColor} rounded-lg p-6 hover:shadow-lg transition-shadow duration-200`}
              >
                <div
                  className={`${category.color} rounded-full w-12 h-12 flex items-center justify-center mb-4`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {category.name}
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  {category.description}
                </p>
                <Link
                  href="#"
                  className={`mt-4 inline-flex items-center text-sm font-medium ${category.color} hover:opacity-75`}
                >
                  Browse All
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
