'use client';

import React, { useState } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { useTransactions } from '@/contexts/TransactionContext';
import DeleteButton from '../DeleteButton/DeleteButton'; 
import EditButton from '../EditButton/EditButton';

interface TransactionTableProps {
  currPage: number;
  itemsPerPage: number;
}

export default function TransactionTable({ currPage, itemsPerPage }: TransactionTableProps) {
  const { filteredTransactions } = useTransactions();

  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    // console.log('a: ', a.date)
    // console.log('b: ', b.date)
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return dateB - dateA;
  });


  const startIndex = (currPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currTransactions = sortedTransactions.slice(startIndex, endIndex);

  return (
    <div>
      {/* Transaction Table - Desktop */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">วันที่</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">ประเภท</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">หมวดหมู่</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">รายละเอียด</th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-slate-700">จำนวนเงิน</th>
              <th className="px-6 py-4 text-center text-sm font-semibold text-slate-700">จัดการ</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredTransactions.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                  ไม่มีรายการในเดือนนี้
                </td>
              </tr>
            ) : (
              currTransactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {new Date(transaction.date).toLocaleDateString('th-TH', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
                      transaction.type === 'income'
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-rose-100 text-rose-700'
                    }`}>
                      {transaction.type === 'income' ? (
                        <>
                          <TrendingUp className="w-3.5 h-3.5" />
                          รายรับ
                        </>
                      ) : (
                        <>
                          <TrendingDown className="w-3.5 h-3.5" />
                          รายจ่าย
                        </>
                      )}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-slate-700">
                    {transaction.category}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {transaction.description}
                  </td>
                  <td className={`px-6 py-4 text-sm font-semibold text-right ${
                    transaction.type === 'income' ? 'text-emerald-600' : 'text-rose-600'
                  }`}>
                    {transaction.type === 'income' ? '+' : '-'}฿{transaction.amount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-center flex gap-1 justify-center">
                    <DeleteButton rowID={transaction.id} />
                    <EditButton rowID={transaction.id } />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Transaction List - Mobile */}
      <div className="md:hidden divide-y divide-slate-100">
        {filteredTransactions.length === 0 ? (
          <div className="px-4 py-12 text-center text-slate-500">
            ไม่มีรายการในเดือนนี้
          </div>
        ) : (
          currTransactions.map((transaction) => (
            <div key={transaction.id} className="p-4 hover:bg-slate-50 transition-colors">
              <div className="flex justify-between items-start mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      transaction.type === 'income'
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-rose-100 text-rose-700'
                    }`}>
                      {transaction.type === 'income' ? (
                        <>
                          <TrendingUp className="w-3 h-3" />
                          รายรับ
                        </>
                      ) : (
                        <>
                          <TrendingDown className="w-3 h-3" />
                          รายจ่าย
                        </>
                      )}
                    </span>
                    <span className="text-xs text-slate-500">
                      {new Date(transaction.date).toLocaleDateString('th-TH', {
                        day: '2-digit',
                        month: 'short'
                      })}
                    </span>
                  </div>
                  <div className="font-medium text-slate-800 mb-1">{transaction.category}</div>
                  <div className="text-sm text-slate-600">{transaction.description}</div>
                </div>
                <div className="text-right ml-3">
                  <div className={`text-lg font-bold mb-2 ${
                    transaction.type === 'income' ? 'text-emerald-600' : 'text-rose-600'
                  }`}>
                    {transaction.type === 'income' ? '+' : '-'}฿{transaction.amount.toLocaleString()}
                  </div>

                  <div className="flex gap-2 items-center">
                    <EditButton rowID={transaction.id} />
                    <DeleteButton rowID={transaction.id} />
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}