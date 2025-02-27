'use client';
import { ReactNode } from 'react';
import { Scroll } from '@/components/Scroll/Scroll';
import { Header } from '@/components/Header/Header';
import styles from '@/app/page.module.css';
import { Sidebar, sidebarItems } from '@/components/Sidebar/Sidebar';
import { useRedirectIfAnonymousWithUser } from '@/hooks/useRedirectIfAnonymousWithUser';

// ClientLayout Добавлен для использования на стороне клиента проверки авторизации.
export default function ClientLayout({ children }: { children: ReactNode }) {
  const { data, isLoading } = useRedirectIfAnonymousWithUser();

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <Header />
      <Scroll style={{ height: '100vh', overflow: 'hidden' }}>
        <div className={styles.page}>
          {data && <Sidebar elements={sidebarItems} />}
          {children}
        </div>
      </Scroll>
    </>
  );
}
