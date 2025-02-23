import { Play } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-indigo-50 to-purple-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Discover Your Perfect Style
            </h1>
            <p className="text-gray-600 text-lg mb-8">
              Shop the latest trends in fashion, electronics, and lifestyle
              products with exclusive deals and discounts.
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <Link
                to="/shop"
                className="px-8 py-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 flex items-center"
              >
                Shop Now
              </Link>
              <button className="px-8 py-3 bg-white text-gray-700 rounded-full hover:bg-gray-50 flex items-center">
                <Play className="w-4 h-4 mr-2" />
                Watch Demo
              </button>
            </div>

            <div className="grid grid-cols-3 gap-8">
              <div>
                <div className="text-2xl font-bold mb-1">50k+</div>
                <div className="text-gray-600">Products</div>
              </div>
              <div>
                <div className="text-2xl font-bold mb-1">100k+</div>
                <div className="text-gray-600">Customers</div>
              </div>
              <div>
                <div className="text-2xl font-bold mb-1">24/7</div>
                <div className="text-gray-600">Support</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <img
                    src="/images/computer.jpg"
                    className="w-full h-40 mb-4"
                  />
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <img
                    src="/images/photography.jpg"
                    className="w-full h-40 mb-4"
                  />
                </div>
              </div>
              <div className="space-y-4 mt-8">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <img
                    src="/images/network.jpg"
                    alt="Networking"
                    className="w-full h-40 mb-4"
                  />
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <img
                    src="/images/smartphones.jpg"
                    alt="Smartphones"
                    className="w-full h-40 mb-4"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
