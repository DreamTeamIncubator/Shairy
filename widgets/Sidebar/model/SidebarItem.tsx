import Link from 'next/link'

import s from './SidebarItem.module.scss'
import { usePathname } from 'next/navigation'

interface SidebarItemProps {
  item: string
  pathValue: string
}

export const SidebarItem = ({ item, pathValue }: SidebarItemProps) => {
  // const itemPath = formatPathForURL(pathname)
  const pathname = usePathname()
  const isActive = pathname.includes(`/${pathValue}`)

  const fullPath = pathValue === 'log-out' ? `/auth/${pathValue}` : `/${pathValue}`

  return (
      <li className={s.item}>
        <Link className={`${s.link} ${isActive ? s.active : ''}`} href={fullPath}>
          <div
              className={s.icon}
              style={{ maskImage: `url(/icons/sidebarIcons/${pathValue}.svg)` }}
          />
          <span>{item}</span>
        </Link>
      </li>
  )
}
///${pathname.split('/')[2]}