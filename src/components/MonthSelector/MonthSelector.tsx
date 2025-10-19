'use client';

import React from 'react';
import { Calendar } from 'lucide-react';
import { useTransactions } from '@/contexts/TransactionContext';

export default function MonthSelector() {
  const { selectedMonth, setSelectedMonth } = useTransactions();

  return (
    <div className="flex items-center gap-3">
      <Calendar className="w-5 h-5 text-slate-600 flex-shrink-0" />
      <input
        type="month"
        value={selectedMonth}
        onChange={(e) => setSelectedMonth(e.target.value)}
        className="flex-1 sm:flex-none px-3 sm:px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base text-gray-600"
      />
    </div>
  );
}