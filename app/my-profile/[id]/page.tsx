'use client'
import React, { useEffect, useRef, useState } from 'react'
import { useGetAllPostsQuery, useGetAllUsersPostsQuery } from '@/features/posts/api/posts'
import s from './myProfile.module.scss'
import { ModalRadix } from '@/shared/ui/Modal/ModalRadix'
import ProfileDescription from '@/features/profile/ui/ProfileDescription'
import { useParams } from 'next/navigation'

const MyProfile = () => {
  const [isOpen, setIsOpen] = useState(false)

  const [endCursorPostId, setEndCursorPostId] = useState<number | null>(null)
  const { id } = useParams()

  //request all public posts for test
  //TODO: replace it with users post
  const { data: allPosts } = useGetAllPostsQuery({
    pageSize: 8,
    endCursorPostId,
  })
  // const {data: allPosts, isFetching} = useGetAllUsersPostsQuery({
  //     pageSize: 8,
  //     endCursorPostId,
  //      id
  // })

  const lastPostRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!lastPostRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && allPosts?.items) {
            const lastPostId = allPosts.items[allPosts.items.length - 1]?.id
            if (lastPostId && lastPostId !== endCursorPostId) {
              setEndCursorPostId(lastPostId)
            }
          }
        })
      },
      { threshold: 0.1 }
    )

    observer.observe(lastPostRef.current)

    return () => {
      observer.disconnect()
    }
  }, [allPosts, endCursorPostId])

  const onClickHandler = () => {
    //TODO: open post if user is authorised
    setIsOpen(true)
  }
  if (!id) {
    return <div>Loading...</div>
  }
  return (
    <>
      {/* <ProfileDescription /> */}
      <div className={s.postsWrapper}>
        {allPosts?.items.map((item, index) => {
          const isLastPost = index === allPosts.items.length - 1
          return (
            <div
              key={item.id}
              ref={isLastPost ? lastPostRef : null}
              className={s.post}
              onClick={onClickHandler}>
              <img src={item?.images[0]?.url} alt="photo-post" className={s.img} />
            </div>
          )
        })}
      </div>
      <ModalRadix open={isOpen} onClose={() => setIsOpen(false)} modalTitle={''} />
    </>
  )
}

export default MyProfile
