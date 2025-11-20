"use client";

import React, { useState } from 'react';
import LoginPage from '@/components/AuthContent/Login';
import RegisterPage from '@/components/AuthContent/Register';

export default function Auth() {
    const [currForm, setCurrForm] = useState<'register' | 'login'>('login');
    return (
    <>
    {currForm === 'login' ? (
            <LoginPage isCurrForm={currForm} onSwitch={() => setCurrForm('register')} />
        ): (
            <RegisterPage isCurrForm={currForm} onSwitch={() => setCurrForm('login')} />
        )}
    </>
    )
}
