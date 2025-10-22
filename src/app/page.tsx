'use client';

import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { TransactionProvider } from '@/contexts/TransactionContext';
import SummaryCards from '@/components/SummaryCards/SummaryCards';
import MonthSelector from '@/components/MonthSelector/MonthSelector';
import TransactionTable from '@/components/TransactionTable/TransactionTable';
import TransactionAddModal from '@/components/Transaction/TransactionEditModal';
import RootLayout from '../layouts/RootLayout/RootLayout';

function HomeContent() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-sky-50">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-0">
            MyExpense
          </h1>
          <p className="text-slate-600 text-sm sm:text-base">
            จัดการการเงินของคุณอย่างมีประสิทธิภาพ
          </p>
        </div>

        {/* Summary Cards */}
        <SummaryCards />

        {/* Main Content */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
          {/* Toolbar */}
          <div className="p-4 sm:p-6 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-slate-100">
            <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 sm:gap-4">
              <MonthSelector />
              
              <button
                onClick={() => setIsModalOpen(true)}
                onTouchMove={() => setIsModalOpen(true)}
                className="flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-400 text-white rounded-lg font-medium shadow-lg shadow-blue-200 hover:shadow-xl hover:scale-105 transition-all text-sm sm:text-base cursor-pointer"
              >
                <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                เพิ่มรายการ
              </button>
            </div>
          </div>

          {/* Transaction Table */}
          <TransactionTable />
        </div>
      </div>

      {/* Modal */}
      <TransactionAddModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
}

export default function Home() {
  return (
    <RootLayout>
      <TransactionProvider>
        <HomeContent />
      </TransactionProvider>
    </RootLayout>
  );
}