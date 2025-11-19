    "use client";

    import React, { useEffect, useState } from 'react';
    import RootLayout from '../../layouts/RootLayout/RootLayout';
    import LoginPage from '@/components/AuthContent/Login';
    import RegisterPage from '@/components/AuthContent/Register';

    export default function page() {
        const [currForm, setCurrForm] = useState<'register' | 'login'>('login');
        
        useEffect(() => {
            if (currForm === 'login') {
                
            }
        }, [currForm]);

        return (
            <RootLayout>
                {currForm === 'login' ? (
                    <LoginPage onSwitch={() => setCurrForm('register')} />
                ): (
                    <RegisterPage onSwitch={() => setCurrForm('login')} />
                )}
            </RootLayout>
        ) 
    }
