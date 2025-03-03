import Link from 'next/link';

import s from './SidebarItem.module.scss';
import { formatPath, formatPathForURL } from '@/shared/lib/formatPath';

interface SidebarItemProps {
  item: string;
  pathname: string;
  prePath?: string;
}

export const SidebarItem = ({ item, pathname, prePath }: SidebarItemProps) => {
  const itemPath = formatPathForURL(item);
  const isActive = pathname === `/${itemPath}`;

  return (
    <li className={s.item}>
      <Link className={`${s.link} ${isActive ? s.active : ''}`} href={`/${prePath ? prePath + itemPath : itemPath}`}>
        <div className={s.icon} style={{ maskImage: `url(/icons/sidebarIcons/${item}.svg)` }} />
        <span>{formatPath(item)}</span>
      </Link>
    </li>
  );
};
