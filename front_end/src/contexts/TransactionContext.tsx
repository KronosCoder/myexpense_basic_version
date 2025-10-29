'use client';

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from 'react';
import { mockData } from '@/utils/data/mock_list';
import shortid from 'shortid';

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
  updateTransaction: (id: string, data: Partial<Transaction>) => void;
  deleteTransaction: (id: string) => boolean;
  totalIncome: number;
  totalExpense: number;
  balance: number;
  getSingleTransaction: (id: string) => Transaction[];
}

const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

export function TransactionProvider({ children }: { children: ReactNode }) {
  /* ----------------------- Mock data ----------------------- */
  const [transactions, setTransactions] = useState<Transaction[]>(() =>
    mockData.map((item) => ({
      ...item,
      type: item.type as 'income' | 'expense',
    }))
  );
  
  /* ----------------------- Get date ----------------------- */
  const now = new Date();
  const currMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  const [selectedMonth, setSelectedMonth] = useState(currMonth);

  /* ------------------- values ------------------- */
  const filteredTransactions = transactions.filter((t) =>
    t.date.startsWith(selectedMonth)
  );
  
  const totalIncome = filteredTransactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = filteredTransactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpense;

  /* ------------------- Functions ------------------- */
  const getSingleTransaction = useCallback(
    (id: string): Transaction[] => {
      return transactions.filter((t) => t.id === id);
    },
    [transactions]
  );

  const addTransaction = useCallback((transaction: Omit<Transaction, 'id'>) => {
    const newTx: Transaction = {
      ...transaction,
      id: shortid.generate(),
    };
    setTransactions((prev) => [newTx, ...prev]);
  }, []);

  const updateTransaction = useCallback(
    (id: string, data: Partial<Transaction>) => {
      setTransactions((prev) =>
        prev.map((t) => (t.id === id ? { ...t, ...data } : t))
      );
    },
    []
  );

  const deleteTransaction = useCallback(
    (id: string): boolean => {
      const exists = transactions.some((t) => t.id === id);
      if (!exists) return false;

      setTransactions((prev) => prev.filter((t) => t.id !== id));
      return true;
    },
    [transactions]
  );

  /* ------------------- Provider value ------------------- */
  return (
    <TransactionContext.Provider
      value={{
        transactions,
        selectedMonth,
        setSelectedMonth,
        filteredTransactions,
        addTransaction,
        updateTransaction,
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

/* Hook */
export function useTransactions() {
  const ctx = useContext(TransactionContext);
  if (!ctx) throw new Error('useTransactions must be used within a TransactionProvider');
  return ctx;
}