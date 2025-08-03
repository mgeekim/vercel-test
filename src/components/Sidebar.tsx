'use client';

import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';

interface SidebarProps {
  selectedInvestor: string;
  setSelectedInvestor: (investor: string) => void;
}

interface Investor {
  id: string;
  name: string;
  performance: string;
  isPositive: boolean;
  portfolioValue: string;
}

const investors: Investor[] = [
  {
    id: 'warren-buffett',
    name: 'Warren Buffett',
    performance: '+0.63%',
    isPositive: true,
    portfolioValue: '$252B'
  },
  {
    id: 'michael-burry',
    name: 'Michael Burry',
    performance: '+33.86%',
    isPositive: true,
    portfolioValue: '$18.7M'
  },
  {
    id: 'cathie-wood',
    name: 'Cathie Wood',
    performance: '+60.77%',
    isPositive: true,
    portfolioValue: '$14B'
  },
  {
    id: 'bill-ackman',
    name: 'Bill Ackman',
    performance: '-2.34%',
    isPositive: false,
    portfolioValue: '$8.2B'
  },
  {
    id: 'charlie-munger',
    name: 'Charlie Munger',
    performance: '+1.23%',
    isPositive: true,
    portfolioValue: '$45B'
  }
];

export default function Sidebar({ selectedInvestor, setSelectedInvestor }: SidebarProps) {
  return (
    <div className="w-80 bg-white border-r border-gray-200 h-screen overflow-y-auto">
      <div className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Top Investors</h2>

        {/* Filters */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            <button className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full">
              All
            </button>
            <button className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full hover:bg-gray-200">
              Growth
            </button>
            <button className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full hover:bg-gray-200">
              Value
            </button>
            <button className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full hover:bg-gray-200">
              Short
            </button>
          </div>
        </div>

        {/* Investor List */}
        <div className="space-y-3">
          {investors.map((investor) => (
            <div
              key={investor.id}
              onClick={() => setSelectedInvestor(investor.id)}
              className={`p-4 rounded-lg cursor-pointer transition-colors ${
                selectedInvestor === investor.id
                  ? 'bg-blue-50 border border-blue-200'
                  : 'hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-gray-900">{investor.name}</h3>
                <div className="flex items-center space-x-1">
                  {investor.isPositive ? (
                    <TrendingUp className="h-4 w-4 text-green-500" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-500" />
                  )}
                  <span className={`text-sm font-medium ${
                    investor.isPositive ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {investor.performance}
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-1 text-sm text-gray-500">
                <DollarSign className="h-4 w-4" />
                <span>{investor.portfolioValue}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}