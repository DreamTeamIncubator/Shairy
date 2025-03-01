'use client';
import { ReactNode } from 'react';
import { Scroll } from '@/shared/ui/Scroll/Scroll';
import { Header } from '@/widgets/Header/Header';
import styles from '@/app/page.module.css';
import { Sidebar, sidebarItems } from '@/widgets/Sidebar/Sidebar';
import { useGetMeQuery } from '@/features/auth/api/auth';

// ClientLayout Добавлен для использования на стороне клиента проверки авторизации.
export default function ClientLayout({ children }: { children: ReactNode }) {
  const { data } = useGetMeQuery();

  return (
    <>
      <Header />
      <div className={styles.page}>
        {data && <Sidebar elements={sidebarItems} />}
        <Scroll style={{ height: '100vh', overflow: 'hidden' }}>{children}</Scroll>
      </div>
    </>
  );
}
