import type {Metadata} from 'next';
import {Geist, Geist_Mono} from 'next/font/google';
import './globals.css';
import {Header} from '@/components/Header/Header';
import {Sidebar, sidebarItems} from '@/components/Sidebar/Sidebar';
import styles from './page.module.css';
import {Scroll} from '@/components/Scroll/Scroll';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: 'Shairy',
    description: 'Shairy',
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable}`}>
                <Scroll maxHeight={'100vh'}>
                    <Header/>
                    <div className={styles.page}>
                        <Sidebar elements={sidebarItems}/>
                        {children}
                    </div>
                </Scroll>
            </body>
        </html>
    );
}
