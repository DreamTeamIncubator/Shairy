import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { ReactNode } from 'react';
import { StoreWrapper } from '@/store/store-wrapper';
import { Scroll } from '@/components/Scroll/Scroll';
import { Header } from '@/components/Header/Header';
import styles from '@/app/page.module.css';
import { Sidebar, sidebarItems } from '@/components/Sidebar/Sidebar';

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

export default function Layout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <StoreWrapper>
          <Header />
          <Scroll style={{ height: '100vh', overflow: 'auto' }}>
            <div className={styles.page}>
              <Sidebar elements={sidebarItems} />
              {children}
            </div>
          </Scroll>
        </StoreWrapper>
      </body>
    </html>
  );
}
