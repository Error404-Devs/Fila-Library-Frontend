import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../styles/globals.css';
import AuthProvider from './context/AuthProvider';
import { Toaster } from '@/components/ui/toaster';
import { CheckboxProvider } from './context/CheckboxContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Fila Library',
    description: 'Books for filadelfia students'
};

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <AuthProvider>
                    <CheckboxProvider>{children}</CheckboxProvider>
                </AuthProvider>
                <Toaster />
            </body>
        </html>
    );
}
