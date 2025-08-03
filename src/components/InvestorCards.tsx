'use client';

import { TrendingUp } from 'lucide-react';

interface Investor {
  id: string;
  name: string;
  affiliation: string;
  performance: string;
  portfolioSize: string;
  topHoldings: string[];
  additionalStocks: number;
}

const investors: Investor[] = [
  {
    id: 'warren-buffett',
    name: 'Warren Buffett',
    affiliation: 'Berkshire Hathaway',
    performance: '0.63% last year',
    portfolioSize: '$252 Billion portfolio',
    topHoldings: ['Apple', 'American Express', 'Bank Of America'],
    additionalStocks: 32,
  },
  {
    id: 'michael-burry',
    name: 'Michael Burry',
    affiliation: 'Scion Asset Management, LLC',
    performance: '33.86% last year',
    portfolioSize: '$18.7 Million portfolio',
    topHoldings: ['Estee Lauder Cos.', 'Cenovus Energy', 'Biogen'],
    additionalStocks: 0,
  },
  {
    id: 'cathie-wood',
    name: 'Cathie Wood',
    affiliation: 'ARK Invest',
    performance: '60.77% last year',
    portfolioSize: '$14 Billion portfolio',
    topHoldings: ['Coinbase Global', 'Tesla', 'Roblox'],
    additionalStocks: 181,
  },
];

export default function InvestorCards() {
  return (
    <section className="bg-gray-50 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {investors.map((investor) => (
            <div
              key={investor.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200"
            >
              {/* Investor Info */}
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {investor.name}
                </h3>
                <p className="text-sm text-gray-600 mb-3">{investor.affiliation}</p>

                {/* Performance */}
                <div className="flex items-center space-x-2 mb-2">
                  <TrendingUp className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600">{investor.performance}</span>
                </div>

                {/* Portfolio Size */}
                <p className="text-sm font-medium text-gray-900">{investor.portfolioSize}</p>
              </div>

              {/* Top Holdings */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Top Holdings</h4>
                <div className="flex flex-wrap gap-2">
                  {investor.topHoldings.map((holding, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                    >
                      {holding}
                    </span>
                  ))}
                </div>
              </div>

              {/* Additional Stocks */}
              <div className="text-sm text-gray-500">
                + {investor.additionalStocks} more stocks
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}