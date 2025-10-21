import React from 'react';
import { HeroUIProvider } from '@heroui/react';
import "../../themes/globals.css";
import "primereact/resources/themes/lara-light-blue/theme.css"; 
import "primereact/resources/primereact.min.css";               
import "primeicons/primeicons.css";   

interface RootLayoutProps {
    children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <HeroUIProvider>   
        {children}
    </HeroUIProvider> 
  )
}
