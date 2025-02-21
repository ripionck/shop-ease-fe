import { Link } from 'react-router-dom';

const categories = [
  {
    id: 'e1fa9a51-007d-4ff0-9d76-1c3757000f37',
    name: 'Computers',
    description: 'Desktops, Laptops & Components',
    cover: '/src/assets/computer.jpg',
  },
  {
    id: 'c779099e-1c21-4529-841d-26a0eb77b66e',
    name: 'Accessories',
    description: 'PC Peripherals & Gadgets',
    cover: '/src/assets/accessories.jpg',
  },
  {
    id: 'fcb0bfb9-986f-44a4-a830-a8838132e744',
    name: 'Gaming',
    description: 'Consoles & Gaming Gear',
    cover: '/src/assets/gaming.jpg',
  },
  {
    id: '2b296a09-3179-424f-9cc6-28d7c391c75d',
    name: 'Photography',
    description: 'Cameras & Equipment',
    cover: '/src/assets/photography.jpg',
  },
  {
    id: 'e4f3554f-cd69-4e93-a6d5-2351e03bf070',
    name: 'Smartphones',
    description: 'Latest Models & Accessories',
    cover: '/src/assets/smartphones.jpg',
  },
  {
    id: 'ab10206b-5f81-4502-ae89-8de140fe59ad',
    name: 'Networking',
    description: 'Routers & Connectivity',
    cover: '/src/assets/network.jpg',
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
