'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { mockData } from '@/utils/data/mock_list';
import shortid from 'shortid';

export interface Transaction {
  id: string;
  type: string;
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
  deleteTransaction: (id: string) => boolean;
  totalIncome: number;
  totalExpense: number;
  balance: number;
  getSingleTransaction: (id: string) => Transaction[];
}

const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

export function TransactionProvider({ children }: { children: ReactNode }) {

  /* Mock data */
  const [transactions, setTransactions] = useState<Transaction[]>(mockData);

  /* Variables */
  const date = new Date();
  const currMouth = `${date.getFullYear()}-${date.getMonth() + 1}`;
  const [selectedMonth, setSelectedMonth] = useState(currMouth);

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

  const getSingleTransaction = (id: string) => {
    const data = transactions.filter(t => t.id === id);
    return data;
  } 

  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: shortid.generate()
    };
    setTransactions([newTransaction, ...transactions]);
  };
  const isExistingTransaction = (id: string) => filteredTransactions.some(t => t.id === id);
  const deleteTransaction = (id: string) => {
    const isExisting: boolean = isExistingTransaction(id);
    if (!isExisting) return false;
    setTransactions(transactions.filter(t => t.id !== id));
    return true;
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
        balance,
        getSingleTransaction,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
}

/* Handle */
export function useTransactions() {
  const context = useContext(TransactionContext);
  if (context === undefined) throw new Error('useTransactions must be used within a TransactionProvider');
  return context;
}