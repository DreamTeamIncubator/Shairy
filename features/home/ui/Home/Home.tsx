'use client'

import { useEffect, useRef, useState } from 'react'
import { useGetPostsFollowersQuery } from '../../api/home'
import s from './Home.module.scss'
import { Post } from '../Post/Post'
import { Item } from '../../api/types'

export const Home = () => {
  const [posts, setPosts] = useState<Item[]>([])
  const [cursor, setCursor] = useState(0)
  const [shouldLoad, setShouldLoad] = useState(true)

  const containerRef = useRef<HTMLDivElement>(null)

  const { data, isFetching } = useGetPostsFollowersQuery(
    {
      pageSize: 8,
      pageNumber: 1,
      endCursorPostId: cursor,
    },
    {
      skip: !shouldLoad,
    }
  )
  useEffect(() => {
    if (data?.items?.length) {
      setPosts((prev) => [...prev, ...data.items])

      const lastId = data.items[data.items.length - 1]?.id
      if (lastId) setCursor(lastId)
      if (data.items.length < 8) {
        setShouldLoad(false)
      }
    } else if (data) {
      setShouldLoad(false)
    }
  }, [data])

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current
      if (!container) return

      const { scrollTop, scrollHeight, clientHeight } = container

      if (scrollTop + clientHeight >= scrollHeight - 100 && !isFetching && shouldLoad) {
        setShouldLoad(true) 
      }
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener('scroll', handleScroll)
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll)
      }
    }
  }, [isFetching, shouldLoad])

  return (
    <div
      className={s.container}
      ref={containerRef}
      style={{ height: 'calc(100vh-60px)', overflowY: 'auto' }}>
      {posts.map((item) => (
        <Post data={item} key={item.id} />
      ))}
      {isFetching && <p style={{ textAlign: 'center' }}>Загрузка...</p>}
      {!shouldLoad && <p style={{ textAlign: 'center' }}>Больше постов нет</p>}
    </div>
  )
}
