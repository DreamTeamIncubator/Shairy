import Link from 'next/link'

import s from './SidebarItem.module.scss'
import { formatPath, formatPathForURL } from '@/shared/lib/formatPath'

interface SidebarItemProps {
  item: string
  pathname: string
  prePath?: string
}

export const SidebarItem = ({ item, pathname, prePath }: SidebarItemProps) => {
  const itemPath = formatPathForURL(item)
  const isActive = pathname === `/${itemPath}`

  const fullPath =
    item === 'log-out' ? `/auth/${itemPath}` : `/${prePath ? prePath + itemPath : itemPath}`

  return (
    <li className={s.item}>
      <Link className={`${s.link} ${isActive ? s.active : ''}`} href={fullPath}>
        <div className={s.icon} style={{ maskImage: `url(/icons/sidebarIcons/${item}.svg)` }} />
        <span>{formatPath(item)}</span>
      </Link>
    </li>
  )
}
