import { ShoppingCart } from 'lucide-react';
import { useEffect, useState } from 'react';

const flashDeals = [
  {
    id: 1,
    name: 'Premium Laptop',
    image: '/images/Premium-Laptop.jpg',
    price: 899,
    originalPrice: 1499,
    discount: '-40%',
  },
  {
    id: 2,
    name: 'Wireless Headphones',
    image: '/images/Wireless-Headphone.jpg',
    price: 149,
    originalPrice: 299,
    discount: '-50%',
  },
  {
    id: 3,
    name: 'Smartphone Pro',
    image: '/images/Smartphone-Pro.jpg',
    price: 699,
    originalPrice: 999,
    discount: '-30%',
  },
];

export default function FlashDeals() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 24,
    minutes: 45,
    seconds: 18,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        const newSeconds = prev.seconds - 1;
        if (newSeconds >= 0) return { ...prev, seconds: newSeconds };

        const newMinutes = prev.minutes - 1;
        if (newMinutes >= 0)
          return { ...prev, minutes: newMinutes, seconds: 59 };

        const newHours = prev.hours - 1;
        if (newHours >= 0) return { hours: newHours, minutes: 59, seconds: 59 };

        clearInterval(timer);
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Flash Deals</h2>
        <p className="text-gray-600">
          Don&apos;t miss out on these amazing limited-time offers
        </p>
      </div>

      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          <span className="text-yellow-500">⚡</span>
          <span className="font-medium">Deals End In:</span>
        </div>

        <div className="flex gap-4">
          <div className="bg-gray-900 text-white px-4 py-2 rounded-lg">
            <span className="text-xl font-bold">
              {timeLeft.hours.toString().padStart(2, '0')}
            </span>
            <span className="text-sm block">Hours</span>
          </div>
          <div className="bg-gray-900 text-white px-4 py-2 rounded-lg">
            <span className="text-xl font-bold">
              {timeLeft.minutes.toString().padStart(2, '0')}
            </span>
            <span className="text-sm block">Minutes</span>
          </div>
          <div className="bg-gray-900 text-white px-4 py-2 rounded-lg">
            <span className="text-xl font-bold">
              {timeLeft.seconds.toString().padStart(2, '0')}
            </span>
            <span className="text-sm block">Seconds</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {flashDeals.map((deal) => (
          <div
            key={deal.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div className="relative">
              <img
                src={deal.image || '/placeholder.svg'}
                alt={deal.name}
                className="w-full h-72"
              />
              <span className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 text-sm rounded">
                {deal.discount}
              </span>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2">{deal.name}</h3>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl font-bold text-red-500">
                  ${deal.price}
                </span>
                <span className="text-sm text-gray-500 line-through">
                  ${deal.originalPrice}
                </span>
              </div>
              <button className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center justify-center gap-2">
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-8">
        <button className="inline-flex items-center px-6 py-3 rounded-full bg-indigo-600 text-white hover:bg-indigo-700">
          View All Deals
          <svg
            className="w-5 h-5 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </section>
  );
}
