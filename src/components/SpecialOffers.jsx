'use client';

import { useState, useEffect } from 'react';
import { Truck, RotateCcw, Headphones } from 'lucide-react';

const services = [
  {
    id: 1,
    title: 'Free Shipping',
    description: 'On orders over $100',
    icon: Truck,
    iconColor: 'text-blue-500',
  },
  {
    id: 2,
    title: 'Easy Returns',
    description: '30-day return policy',
    icon: RotateCcw,
    iconColor: 'text-green-500',
  },
  {
    id: 3,
    title: '24/7 Support',
    description: 'Always here to help',
    icon: Headphones,
    iconColor: 'text-purple-500',
  },
];

const CountdownTimer = ({ hours, minutes, seconds }) => {
  return (
    <div className="flex gap-2">
      <div className="bg-white/20 backdrop-blur-sm rounded px-3 py-2">
        <span className="text-white font-semibold">{hours}</span>
        <span className="text-white/80 text-sm block">Hours</span>
      </div>
      <div className="bg-white/20 backdrop-blur-sm rounded px-3 py-2">
        <span className="text-white font-semibold">{minutes}</span>
        <span className="text-white/80 text-sm block">Mins</span>
      </div>
      <div className="bg-white/20 backdrop-blur-sm rounded px-3 py-2">
        <span className="text-white font-semibold">{seconds}</span>
        <span className="text-white/80 text-sm block">Secs</span>
      </div>
    </div>
  );
};

export default function SpecialOffers() {
  const [timeLeft1, setTimeLeft1] = useState({
    hours: 24,
    minutes: 45,
    seconds: 30,
  });
  const [timeLeft2, setTimeLeft2] = useState({
    hours: 12,
    minutes: 30,
    seconds: 15,
  });

  useEffect(() => {
    const timer1 = setInterval(() => {
      setTimeLeft1((prev) => {
        const newSeconds = prev.seconds - 1;
        if (newSeconds >= 0) return { ...prev, seconds: newSeconds };

        const newMinutes = prev.minutes - 1;
        if (newMinutes >= 0)
          return { ...prev, minutes: newMinutes, seconds: 59 };

        const newHours = prev.hours - 1;
        if (newHours >= 0) return { hours: newHours, minutes: 59, seconds: 59 };

        clearInterval(timer1);
        return prev;
      });
    }, 1000);

    const timer2 = setInterval(() => {
      setTimeLeft2((prev) => {
        const newSeconds = prev.seconds - 1;
        if (newSeconds >= 0) return { ...prev, seconds: newSeconds };

        const newMinutes = prev.minutes - 1;
        if (newMinutes >= 0)
          return { ...prev, minutes: newMinutes, seconds: 59 };

        const newHours = prev.hours - 1;
        if (newHours >= 0) return { hours: newHours, minutes: 59, seconds: 59 };

        clearInterval(timer2);
        return prev;
      });
    }, 1000);

    return () => {
      clearInterval(timer1);
      clearInterval(timer2);
    };
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-2">Special Offers</h2>
        <p className="text-gray-600">
          Limited time deals you don't want to miss
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-16">
        {/* Summer Collection Card */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-600 to-purple-400 p-8">
          <span className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
            50% OFF
          </span>
          <div className="h-full flex flex-col justify-between">
            <div>
              <h3 className="text-white text-2xl font-bold mb-2">
                Summer Collection
              </h3>
              <p className="text-white/90 mb-4">
                Get ready for summer with our latest collection
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <button className="bg-white text-purple-600 px-6 py-2 rounded-full hover:bg-gray-100 transition-colors">
                Shop Now
              </button>
              <CountdownTimer {...timeLeft1} />
            </div>
          </div>
        </div>

        {/* Tech Gadgets Card */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 to-blue-400 p-8">
          <span className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
            NEW ARRIVAL
          </span>
          <div className="h-full flex flex-col justify-between">
            <div>
              <h3 className="text-white text-2xl font-bold mb-2">
                Tech Gadgets
              </h3>
              <p className="text-white/90 mb-4">
                Latest electronics at unbeatable prices
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <button className="bg-white text-blue-600 px-6 py-2 rounded-full hover:bg-gray-100 transition-colors">
                Shop Now
              </button>
              <CountdownTimer {...timeLeft2} />
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="grid md:grid-cols-3 gap-6">
        {services.map((service) => (
          <div
            key={service.id}
            className="flex items-start gap-4 p-6 rounded-xl bg-white shadow-sm"
          >
            <div
              className={`p-3 rounded-full ${service.iconColor} bg-opacity-10`}
            >
              <service.icon className={`w-6 h-6 ${service.iconColor}`} />
            </div>
            <div>
              <h3 className="font-semibold mb-1">{service.title}</h3>
              <p className="text-gray-600 text-sm">{service.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
