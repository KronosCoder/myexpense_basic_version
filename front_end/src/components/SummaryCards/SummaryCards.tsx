'use client';

import React from 'react';
import { TrendingUp, TrendingDown, Wallet } from 'lucide-react';
import { useTransactions } from '@/contexts/TransactionContext';

export default function SummaryCards() {
  const { totalIncome, totalExpense, balance } = useTransactions();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
      <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg shadow-emerald-100/50 border border-emerald-100">
        <div className="flex items-center justify-between mb-2">
          <span className="text-slate-600 font-medium text-sm sm:text-base">รายรับ</span>
          <div className="p-2 bg-emerald-100 rounded-lg">
            <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
          </div>
        </div>
        <p className="text-2xl sm:text-3xl font-bold text-emerald-600">
          ฿{totalIncome.toLocaleString()}
        </p>
      </div>

      <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg shadow-rose-100/50 border border-rose-100">
        <div className="flex items-center justify-between mb-2">
          <span className="text-slate-600 font-medium text-sm sm:text-base">รายจ่าย</span>
          <div className="p-2 bg-rose-100 rounded-lg">
            <TrendingDown className="w-4 h-4 sm:w-5 sm:h-5 text-rose-600" />
          </div>
        </div>
        <p className="text-2xl sm:text-3xl font-bold text-rose-600">
          ฿{totalExpense.toLocaleString()}
        </p>
      </div>

      <div className="bg-gradient-to-br from-blue-600 to-indigo-400 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg shadow-blue-200/50">
        <div className="flex items-center justify-between mb-2">
          <span className="text-blue-100 font-medium text-sm sm:text-base">คงเหลือ</span>
          <div className="p-2 bg-white/20 rounded-lg">
            <Wallet className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </div>
        </div>
        <p className="text-2xl sm:text-3xl font-bold text-white">
          ฿{balance.toLocaleString()}
        </p>
      </div>
    </div>
  );
}