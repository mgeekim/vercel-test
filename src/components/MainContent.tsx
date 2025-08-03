'use client';

import { TrendingUp, TrendingDown, DollarSign, Calendar, Building } from 'lucide-react';

interface MainContentProps {
  selectedInvestor: string;
}

interface Stock {
  symbol: string;
  name: string;
  shares: string;
  value: string;
  weight: string;
  change: string;
  isPositive: boolean;
}

interface InvestorData {
  id: string;
  name: string;
  company: string;
  performance: string;
  isPositive: boolean;
  portfolioValue: string;
  stocks: Stock[];
}

const investorData: Record<string, InvestorData> = {
  'warren-buffett': {
    id: 'warren-buffett',
    name: 'Warren Buffett',
    company: 'Berkshire Hathaway',
    performance: '+0.63%',
    isPositive: true,
    portfolioValue: '$252 Billion',
    stocks: [
      { symbol: 'AAPL', name: 'Apple Inc.', shares: '915,560,382', value: '$177,252,000,000', weight: '50.76%', change: '+2.34%', isPositive: true },
      { symbol: 'BAC', name: 'Bank of America Corp', shares: '1,032,852,006', value: '$34,196,000,000', weight: '9.80%', change: '-1.23%', isPositive: false },
      { symbol: 'AXP', name: 'American Express Co', shares: '151,610,700', value: '$28,279,000,000', weight: '8.10%', change: '+0.87%', isPositive: true },
      { symbol: 'KO', name: 'Coca-Cola Co', shares: '400,000,000', value: '$24,000,000,000', weight: '6.87%', change: '+1.45%', isPositive: true },
      { symbol: 'CVX', name: 'Chevron Corp', shares: '126,093,326', value: '$18,800,000,000', weight: '5.38%', change: '-0.56%', isPositive: false }
    ]
  },
  'michael-burry': {
    id: 'michael-burry',
    name: 'Michael Burry',
    company: 'Scion Asset Management',
    performance: '+33.86%',
    isPositive: true,
    portfolioValue: '$18.7 Million',
    stocks: [
      { symbol: 'EL', name: 'Estee Lauder Cos Inc', shares: '50,000', value: '$6,250,000', weight: '33.42%', change: '+5.67%', isPositive: true },
      { symbol: 'CVE', name: 'Cenovus Energy Inc', shares: '100,000', value: '$2,100,000', weight: '11.23%', change: '+2.34%', isPositive: true },
      { symbol: 'BIIB', name: 'Biogen Inc', shares: '25,000', value: '$1,875,000', weight: '10.03%', change: '-1.23%', isPositive: false }
    ]
  },
  'cathie-wood': {
    id: 'cathie-wood',
    name: 'Cathie Wood',
    company: 'ARK Invest',
    performance: '+60.77%',
    isPositive: true,
    portfolioValue: '$14 Billion',
    stocks: [
      { symbol: 'COIN', name: 'Coinbase Global Inc', shares: '7,200,000', value: '$1,440,000,000', weight: '10.29%', change: '+15.67%', isPositive: true },
      { symbol: 'TSLA', name: 'Tesla Inc', shares: '3,500,000', value: '$1,050,000,000', weight: '7.50%', change: '+8.34%', isPositive: true },
      { symbol: 'RBLX', name: 'Roblox Corp', shares: '10,000,000', value: '$700,000,000', weight: '5.00%', change: '+12.45%', isPositive: true }
    ]
  }
};

export default function MainContent({ selectedInvestor }: MainContentProps) {
  const investor = investorData[selectedInvestor];

  if (!investor) {
    return (
      <div className="flex-1 p-8">
        <div className="text-center text-gray-500">
          <Building className="h-12 w-12 mx-auto mb-4 text-gray-300" />
          <p>Select an investor to view their portfolio</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{investor.name}</h1>
            <p className="text-gray-600">{investor.company}</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm text-gray-500">Portfolio Value</p>
              <p className="text-lg font-semibold text-gray-900">{investor.portfolioValue}</p>
            </div>
            <div className="flex items-center space-x-1">
              {investor.isPositive ? (
                <TrendingUp className="h-5 w-5 text-green-500" />
              ) : (
                <TrendingDown className="h-5 w-5 text-red-500" />
              )}
              <span className={`text-lg font-semibold ${
                investor.isPositive ? 'text-green-600' : 'text-red-600'
              }`}>
                {investor.performance}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Portfolio Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Portfolio Holdings</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Shares
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Value
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Weight
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Change
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {investor.stocks.map((stock) => (
                <tr key={stock.symbol} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{stock.symbol}</div>
                      <div className="text-sm text-gray-500">{stock.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {stock.shares}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {stock.value}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {stock.weight}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-1">
                      {stock.isPositive ? (
                        <TrendingUp className="h-4 w-4 text-green-500" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-500" />
                      )}
                      <span className={`text-sm font-medium ${
                        stock.isPositive ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {stock.change}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}