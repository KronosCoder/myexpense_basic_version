import React from 'react';
import RootLayout from '../../../layouts/RootLayout/RootLayout';
import LoginPage from '@/components/AuthContent/Login';

export default function page() {
  return (
    <RootLayout>
        <LoginPage />
    </RootLayout>
  )
}
