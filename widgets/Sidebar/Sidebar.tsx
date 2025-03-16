'use client'

import s from './Sidebar.module.scss'
import { usePathname } from 'next/navigation'
import { SidebarItem } from '@/widgets/Sidebar/model/SidebarItem'
import Link from 'next/link'
import { useGetMeQuery } from '@/features/auth/api/auth'
import { formatPathForURL } from '@/shared/lib/formatPath'
import style from './model/SidebarItem.module.scss'

export const sidebarItems = {
  top: ['home', 'create', 'my-profile', 'messenger', 'search'],
  main: ['statistics', 'favorites'],
  footer: ['log-out'],
}

type SidebarProps = {
  elements: typeof sidebarItems
}
export const Sidebar = ({ elements }: SidebarProps) => {
  const { data } = useGetMeQuery()
  const pathname = usePathname()

  if (!data) {
    return null
  }

  const mappedTopElements = elements?.top.map((item, index) => {
    if (item === 'my-profile') {
      const itemPath = formatPathForURL(item)
      const isActive = pathname === `/${itemPath}`
      return (
        <li className={style.item} key={index}>
          <Link
            href={`/my-profile/${data?.userId}`}
            className={`${style.link} ${isActive ? s.active : ''}`}>
            <div
              className={style.icon}
              style={{ maskImage: `url(/icons/sidebarIcons/my-profile.svg)` }}
            />
            <span>My Profile</span>
          </Link>
        </li>
      )
    } else {
      return <SidebarItem key={index} item={item} pathname={pathname} />
    }
  })

  return (
    <nav className={s.sidebar}>
      <ul className={`${s.list} ${s.top}`}>{mappedTopElements}</ul>
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
  )
}
