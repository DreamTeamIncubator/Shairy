import type { Metadata } from 'next';
import '../globals.css';
import { ReactNode } from 'react';
import ClientLayout from '../client-layout';

export const metadata: Metadata = {
  title: 'Shairy',
  description: 'Shairy',
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{ children: ReactNode; modal: ReactNode }>) {
  return (
    <>
      <ClientLayout>
        {children}
        {modal}
      </ClientLayout>
    </>
  );
}
