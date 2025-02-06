'use client';

import { Link } from 'react-router-dom';

// Dummy data for categories
const categories = [
  {
    id: 1,
    title: "Women's Fashion",
    description: 'Discover latest trends',
    image:
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-06%20175232-q8RkFt6pZNl6bVhzEGMemRtlBY4qgq.png',
  },
  {
    id: 2,
    title: "Men's Collection",
    description: 'Style for every occasion',
    image:
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-06%20175232-q8RkFt6pZNl6bVhzEGMemRtlBY4qgq.png',
  },
  {
    id: 3,
    title: 'Accessories',
    description: 'Complete your look',
    image:
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-06%20175232-q8RkFt6pZNl6bVhzEGMemRtlBY4qgq.png',
  },
  {
    id: 4,
    title: 'Footwear',
    description: 'Step in style',
    image:
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-06%20175232-q8RkFt6pZNl6bVhzEGMemRtlBY4qgq.png',
  },
  {
    id: 5,
    title: 'Electronics',
    description: 'Latest gadgets',
    image:
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-06%20175232-q8RkFt6pZNl6bVhzEGMemRtlBY4qgq.png',
  },
  {
    id: 6,
    title: 'Home Decor',
    description: 'Beautiful living spaces',
    image:
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-06%20175232-q8RkFt6pZNl6bVhzEGMemRtlBY4qgq.png',
  },
];

export default function FeaturedCategories() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-2">Featured Categories</h2>
        <p className="text-gray-600">Explore our most popular collections</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div
            key={category.id}
            className="group relative overflow-hidden rounded-xl"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60"></div>

            <img
              src={category.image || '/placeholder.svg'}
              alt={category.title}
              className="w-full h-[300px] object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="text-white text-xl font-semibold mb-1">
                {category.title}
              </h3>
              <p className="text-white/80 text-sm mb-4">
                {category.description}
              </p>
              <Link
                to="/shop"
                className="bg-white text-gray-900 px-6 py-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                Shop Now
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
