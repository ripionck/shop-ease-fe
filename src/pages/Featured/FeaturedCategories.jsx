import { Link } from 'react-router-dom';

const categories = [
  {
    id: '1',
    name: 'Computers',
    description: 'Desktops, Laptops & Components',
    cover: '/images/computer.jpg',
  },
  {
    id: '2',
    name: 'Accessories',
    description: 'PC Peripherals & Gadgets',
    cover: '/images/accessories.jpg',
  },
  {
    id: '3',
    name: 'Gaming',
    description: 'Consoles & Gaming Gear',
    cover: '/images/gaming.jpg',
  },
  {
    id: '4',
    name: 'Photography',
    description: 'Cameras & Equipment',
    cover: '/images/photography.jpg',
  },
  {
    id: '5',
    name: 'Smartphones',
    description: 'Latest Models & Accessories',
    cover: '/images/smartphones.jpg',
  },
  {
    id: '6',
    name: 'Networking',
    description: 'Routers & Connectivity',
    cover: '/images/network.jpg',
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
              src={category.cover || '/placeholder.svg'}
              alt={category.name}
              className="w-full h-[300px] object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="text-white text-xl font-semibold mb-1">
                {category.name}
              </h3>
              <p className="text-white/80 text-sm mb-4">
                {category.description}
              </p>
              <Link
                to="/shop"
                className="bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-gray-100 transition-colors"
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
