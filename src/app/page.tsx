'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import MainContent from '@/components/MainContent';

export default function Home() {
  const [selectedInvestor, setSelectedInvestor] = useState('warren-buffett');

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Sidebar
          selectedInvestor={selectedInvestor}
          setSelectedInvestor={setSelectedInvestor}
        />
        <MainContent selectedInvestor={selectedInvestor} />
      </div>
    </div>
  );
}
