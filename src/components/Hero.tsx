'use client';

import { Mail } from 'lucide-react';

export default function Hero() {
  return (
    <section className="bg-white py-16 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          See how the best investors invest!
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Follow in the footsteps of the world&apos;s best investors and explore their investment portfolios.
        </p>
        <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-3 px-8 rounded-lg flex items-center space-x-2 mx-auto transition-colors duration-200">
          <Mail className="h-5 w-5" />
          <span>Never miss a trade</span>
        </button>
      </div>
    </section>
  );
}