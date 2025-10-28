import React from 'react';
import { HeroUIProvider } from '@heroui/react';
import "primereact/resources/themes/lara-light-blue/theme.css"; 
import "primereact/resources/primereact.min.css";               
import "primeicons/primeicons.css";   
import { ModalProvider } from '@/contexts/ModalContext';


interface RootLayoutProps {
    children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <HeroUIProvider>   
      <ModalProvider>
          {children}
      </ModalProvider>
    </HeroUIProvider> 
  )
}
