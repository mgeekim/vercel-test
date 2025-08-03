'use client';

interface InvestorFiltersProps {
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
}

export default function InvestorFilters({ activeFilter, setActiveFilter }: InvestorFiltersProps) {
  const filters = [
    { id: 'popular', label: 'Popular' },
    { id: 'best-performance', label: 'Best Performance' },
    { id: 'growth-investors', label: 'Growth Investors' },
    { id: 'value-investors', label: 'Value Investors' },
    { id: 'short-sellers', label: 'Short Sellers' },
    { id: 'long-term', label: 'Long-Term' },
  ];

  return (
    <div className="bg-white px-6 py-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center space-x-6">
          <span className="text-sm font-medium text-gray-700">Investors:</span>
          <div className="flex space-x-2">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-3 py-1 text-sm font-medium rounded-full transition-colors duration-200 ${
                  activeFilter === filter.id
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}