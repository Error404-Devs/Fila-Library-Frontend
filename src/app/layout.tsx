import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../styles/globals.css';
import AuthProvider from './context/AuthProvider';
import { Toaster } from '@/components/ui/toaster';
import { BookCheckboxProvider } from './context/BookProvider';
import { StatisticsColumnProvider } from './context/StatisticsProvider';
import { ThemeProvider } from '@/components/ui/theme_provider';

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
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <AuthProvider>
                        <BookCheckboxProvider>
                            <StatisticsColumnProvider>
                                {children}
                            </StatisticsColumnProvider>
                        </BookCheckboxProvider>
                    </AuthProvider>
                    <Toaster />
                </ThemeProvider>
            </body>
        </html>
    );
}
