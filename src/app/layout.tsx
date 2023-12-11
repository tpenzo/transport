'use client';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReduxProvider from '@/redux/ReduxProvider';
import { persistor } from '@/redux/store';
import { PersistGate } from 'redux-persist/integration/react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Transport Support',
    description: 'Transport Support',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <ToastContainer />
                <ReduxProvider>
                    <PersistGate loading={null} persistor={persistor}>
                        {children}
                    </PersistGate>
                </ReduxProvider>
            </body>
        </html>
    );
}
