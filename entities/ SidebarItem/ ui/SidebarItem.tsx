import Link from 'next/link';

import s from './SidebarItem.module.scss';
import { formatPath, formatPathForURL } from '@/features/utils/formatPath';

interface SidebarItemProps {
  item: string;
  pathname: string;
}

export const SidebarItem = ({ item, pathname }: SidebarItemProps) => {
  const itemPath = formatPathForURL(item);
  const isActive = pathname === `/${itemPath}`;

  return (
    <li className={s.item}>
      <Link className={`${s.link} ${isActive ? s.active : ''}`} href={`/${itemPath}`}>
        <div className={s.icon} style={{ maskImage: `url(/icons/sidebarIcons/${item}.svg)` }} />
        <span>{formatPath(item)}</span>
      </Link>
    </li>
  );
};
