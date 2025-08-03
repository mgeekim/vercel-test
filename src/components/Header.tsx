'use client';

import { Search, MoreHorizontal } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">$</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Stockcircle</h1>
            <p className="text-xs text-gray-500">formerly Cheaper Than Guru</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-md mx-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for stocks and gurus"
              className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center space-x-6">
          <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">
            Pro
          </a>
          <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">
            Join
          </a>
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <MoreHorizontal className="h-5 w-5 text-gray-600" />
          </button>
        </div>
      </div>
    </header>
  );
}