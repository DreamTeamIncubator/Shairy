'use client';

import s from './Sidebar.module.scss';
import { usePathname } from 'next/navigation';
import { SidebarItem } from '@/entities/ SidebarItem/ ui/SidebarItem';

export const sidebarItems = {
  top: ['home', 'create', 'my-profile', 'messenger', 'search'],
  main: ['statistics', 'favorites'],
  footer: ['log-out'],
};

type SidebarProps = {
  elements: typeof sidebarItems
};
export const Sidebar = ({ elements }: SidebarProps) => {
  const pathname = usePathname();
  return (
    <nav className={s.sidebar}>
      <ul className={`${s.list} ${s.top}`}>
        {elements?.top.map((item, index) => (
          <SidebarItem key={index} item={item} pathname={pathname} />
        ))}
      </ul>
      <ul className={`${s.list} ${s.main}`}>
        {elements?.main.map((item, index) => (
          <SidebarItem key={index} item={item} pathname={pathname} />
        ))}
      </ul>
      <ul className={s.list}>
        {elements?.footer.map((item, index) => (
          <SidebarItem key={index} item={item} pathname={pathname} />
        ))}
      </ul>
    </nav>
  );
};