"use client";

import React, { useRef } from 'react';
import { HeroUIProvider } from '@heroui/react';
import "primereact/resources/themes/lara-light-blue/theme.css"; 
import "primereact/resources/primereact.min.css";               
import "primeicons/primeicons.css";   
import { Toast } from 'primereact/toast';


interface RootLayoutProps {
    children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const toastModal = useRef<Toast>(null);
  (globalThis as any).toastModal = toastModal;
  return (
    <HeroUIProvider>   
      <Toast 
        ref={toastModal}  
        position="top-center"
      />
      {children}
    </HeroUIProvider> 
  )
}
