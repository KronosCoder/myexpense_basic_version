'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Transaction {
  id: string;
  type: 'income' | 'expense';
  category: string;
  amount: number;
  description: string;
  date: string;
}

interface TransactionContextType {
  transactions: Transaction[];
  selectedMonth: string;
  setSelectedMonth: (month: string) => void;
  filteredTransactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  deleteTransaction: (id: string) => void;
  totalIncome: number;
  totalExpense: number;
  balance: number;
}

const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

export function TransactionProvider({ children }: { children: ReactNode }) {
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: '1',
      type: 'income',
      category: 'เงินเดือน',
      amount: 35000,
      description: 'เงินเดือนประจำ',
      date: '2025-10-01'
    },
    {
      id: '2',
      type: 'expense',
      category: 'อาหาร',
      amount: 250,
      description: 'ร้านอาหารกลางวัน',
      date: '2025-10-15'
    },
    {
      id: '3',
      type: 'expense',
      category: 'ค่าเดินทาง',
      amount: 80,
      description: 'ค่า Grab',
      date: '2025-10-18'
    }
  ]);

  const [selectedMonth, setSelectedMonth] = useState('2025-10');

  const filteredTransactions = transactions.filter(t => 
    t.date.startsWith(selectedMonth)
  );

  const totalIncome = filteredTransactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = filteredTransactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpense;

  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: Date.now().toString()
    };
    setTransactions([newTransaction, ...transactions]);
  };

  const deleteTransaction = (id: string) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        selectedMonth,
        setSelectedMonth,
        filteredTransactions,
        addTransaction,
        deleteTransaction,
        totalIncome,
        totalExpense,
        balance
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
}

export function useTransactions() {
  const context = useContext(TransactionContext);
  if (context === undefined) {
    throw new Error('useTransactions must be used within a TransactionProvider');
  }
  return context;
}