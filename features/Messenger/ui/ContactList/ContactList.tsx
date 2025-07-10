'use client'

import { useEffect, useRef, useState } from 'react'
import { useGetUsersQuery } from '@/features/users/api/users'
import s from './ContactList.module.scss'
import { Contact } from './Contact/Contact'
import { User } from '@/features/users/api/users.types'

type ContactListProps = {
  setReceiver: (receiver: User) => void
  searchValue: string
}

export const ContactList = ({ setReceiver, searchValue }: ContactListProps) => {
  const [page, setPage] = useState(1)
  const [users, setUsers] = useState<User[]>([])
  const containerRef = useRef<HTMLDivElement | null>(null)

  console.log(searchValue)

  const { data, isFetching } = useGetUsersQuery(
    { pageSize: 20, pageNumber: page, search: searchValue },
    { refetchOnMountOrArgChange: true }
  )

  useEffect(() => {
    setPage(1)
    setUsers([])
  }, [searchValue])

  useEffect(() => {
    if (data?.items) {
      setUsers((prev) => [...prev, ...data.items])
    }
  }, [data])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const handleScroll = () => {
      const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 100
      if (atBottom && !isFetching) {
        setPage((prev) => prev + 1)
      }
    }

    el.addEventListener('scroll', handleScroll)
    return () => el.removeEventListener('scroll', handleScroll)
  }, [isFetching])

  return (
    <div className={s.container} ref={containerRef}>
      {users.map((user) => (
        <Contact key={user.id} user={user} setReceiver={setReceiver} />
      ))}
    </div>
  )
}
