import React from 'react';
import { TransactionProvider } from '@/contexts/TransactionContext';
import RootLayout from '../../layouts/RootLayout/RootLayout';
import HomeContent from '@/components/HomeContent/HomeContent';

export default function dashboard() {
  return (
    <RootLayout>
      <TransactionProvider>
        <HomeContent />
      </TransactionProvider>
    </RootLayout>
  );
}