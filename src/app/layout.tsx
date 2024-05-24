import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../styles/globals.css';
import AuthProvider from './context/AuthProvider';
import { Toaster } from '@/components/ui/toaster';
import { BookCheckboxProvider } from './context/BookProvider';
import { StatisticsColumnProvider } from './context/StatisticsProvider';

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
                    <BookCheckboxProvider>
                        <StatisticsColumnProvider>
                            {children}
                        </StatisticsColumnProvider>
                    </BookCheckboxProvider>
                </AuthProvider>
                <Toaster />
            </body>
        </html>
    );
}
