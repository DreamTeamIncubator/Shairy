'use client';

import s from './Sidebar.module.scss';
import { usePathname } from 'next/navigation';
import { SidebarItem } from '@/widgets/Sidebar/model/SidebarItem';
import Link from 'next/link';
import { useGetMeQuery } from '@/features/auth/api/auth';
import style from './model/SidebarItem.module.scss';
import { useState } from 'react';
import { CreatePostModal } from '@/features/posts/ui/CreatePostModal/CreatePostModal';
import { useCreatePostLogic } from '@/features/posts/hooks/useCreatePostLogic';
'use client'
import s from './Sidebar.module.scss'
import { usePathname } from 'next/navigation'
import { SidebarItem } from '@/widgets/Sidebar/model/SidebarItem'
import Link from 'next/link'
import { useGetMeQuery } from '@/features/auth/api/auth'
import style from './model/SidebarItem.module.scss'
import { useState } from 'react'
import CreatePost from '@/features/posts/ui/CreatePost/CreatePost'
import { CreatePostModal } from '@/features/posts/ui/CreatePostModal/CreatePostModal'
import { useBoolean } from '@/hooks/useBoolean'
// export const sidebarItems = {
//   top: ['home', 'create', 'my-profile', 'messenger', 'search'],
//   main: ['statistics', 'favorites'],
//   footer: ['log-out'],
// }

type SidebarProps = {
  sidebarItems: {
    top: { pathValue: string; title: string }[]
    main: { pathValue: string; title: string }[]
    footer: { pathValue: string; title: string }[]
  }
}

export const Sidebar = ({ sidebarItems }: SidebarProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { resetState } = useCreatePostLogic();

    const handleOpenModal = () => {
        resetState();
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const { data } = useGetMeQuery();
    const pathname = usePathname();

    if (!data) {
        return null;
    }

  const mappedTopElements = sidebarItems.top.map((item, index) => {
    // const isActive = pathname.includes(`/${item.pathValue}`)

    if (item.pathValue === 'my-profile') {
      return (
        <li className={style.item} key={index}>
          <Link
            href={`/my-profile/${data?.userId}`}
            className={`${style.link} ${pathname.includes(item.pathValue) ? style.active : ''}`}>
            <div
              className={style.icon}
              style={{ maskImage: `url(/icons/sidebarIcons/my-profile.svg)` }}
            />
            <span>{sidebarItems.top[2].title}</span>
          </Link>
        </li>
      )
    } else if (item.pathValue === 'create') {
      return (
        <li className={style.item} key={index}>
          <Link
            href={`/my-profile/${data?.userId}`}
            className={`${style.link} ${item.pathValue === pathname ? style.active : ''}`}>
            <div
              className={style.icon}
              style={{ maskImage: `url(/icons/sidebarIcons/create.svg)` }}
            />
            <span onClick={handleOpenModal}>{sidebarItems.top[1].title}</span>
          </Link>
        </li>
      )
    } else {
      return <SidebarItem key={index} item={item.title} pathValue={item.pathValue} />
    }
  })

    return (
        <>
            <nav className={s.sidebar}>
                <ul className={`${s.list} ${s.top}`}>{mappedTopElements}</ul>
                <ul className={`${s.list} ${s.main}`}>
                    {sidebarItems?.main.map((item, index) => (
                        <SidebarItem key={index} item={item.title} pathValue={item.pathValue} />
                    ))}
                </ul>
                <ul className={s.list}>
                    {sidebarItems?.footer.map((item, index) => (
                        <SidebarItem key={index} item={item.title} pathValue={item.pathValue} />
                    ))}
                </ul>
            </nav>

            <CreatePostModal isOpen={isModalOpen} onClose={handleCloseModal} />
        </>
    );
};
