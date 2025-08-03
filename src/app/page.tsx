'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import NavigationTabs from '@/components/NavigationTabs';
import InvestorFilters from '@/components/InvestorFilters';
import InvestorCards from '@/components/InvestorCards';

export default function Home() {
  const [activeTab, setActiveTab] = useState('top-investors');
  const [activeFilter, setActiveFilter] = useState('popular');

  return (
    <main className="min-h-screen bg-white">
      <Header />
      <Hero />
      <NavigationTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <InvestorFilters activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
      <InvestorCards />
    </main>
  );
}
