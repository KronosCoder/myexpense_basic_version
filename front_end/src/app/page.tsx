import React from 'react';
import { TransactionProvider } from '@/contexts/TransactionContext';
import RootLayout from '../layouts/RootLayout/RootLayout';
import HomeContent from '@/components/HomeContent/HomeContent';

export default async function Home() {
  return (
    <RootLayout>
      <TransactionProvider>
        <HomeContent />
      </TransactionProvider>
    </RootLayout>
  );
}