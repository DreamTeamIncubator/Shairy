import type { Metadata } from 'next';
import '../globals.css';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Shairy',
  description: 'Shairy',
};

export default function RootLayout({ children, modal }: Readonly<{ children: ReactNode; modal: ReactNode }>) {
  return <>
    {children}
    {modal}
  </>
}

