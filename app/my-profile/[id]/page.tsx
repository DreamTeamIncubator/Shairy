'use client'
import React, {useEffect, useRef, useState} from 'react'
import s from './myProfile.module.scss'
import {ModalRadix} from '@/shared/ui/Modal/ModalRadix'
import {useParams} from 'next/navigation'
import {useGetAllUsersPostsQuery} from '@/features/posts/api/post';
import ProfileDescription from '@/features/profile/ui/ProfileDescription'
import Post from '@/features/posts/ui/Post';
import type {Items} from '@/features/posts/api/post.types';
import {useGetMeQuery} from '@/features/auth/api/auth';

const MyProfile = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [endCursorPostId, setEndCursorPostId] = useState<any>(null)
    const {data: userData} = useGetMeQuery()
    const {id} = useParams()

    const {data: allPosts} = useGetAllUsersPostsQuery({
        pageSize: 8,
        endCursorPostId,
        userId: Number(id)
    })
console.log(allPosts)
    const lastPostRef = useRef<HTMLDivElement | null>(null)
    // const [postId, setPostId] = useState<null | number>(null)
    const [postData, setPostData] = useState<Items>({})

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
            {threshold: 0.1}
        )

        observer.observe(lastPostRef.current)

        return () => {
            observer.disconnect()
        }
    }, [allPosts, endCursorPostId])

    const onClickHandler = (item: Items) => {
        if (!userData) return

        setIsOpen(true)
        setPostData(item)
    }

    const onCloseHandler = () => {
        setIsOpen(false)
    }
    if (!id) {
        return <div>Loading...</div>
    }
    return (
        <>
            <ProfileDescription/>
            <div className={s.postsWrapper}>
                {allPosts?.items.map((item, index) => {
                    const isLastPost = index === allPosts.items.length - 1
                    return (
                        <div
                            key={item.id}
                            ref={isLastPost ? lastPostRef : null}
                            className={s.post}
                            onClick={() => onClickHandler(item)}>
                            <img src={item?.images[0]?.url} alt="photo-post" className={s.img}/>
                        </div>
                    )
                })}
            </div>
            <ModalRadix open={isOpen} onClose={() => setIsOpen(false)} modalTitle={''}>
                <Post postId={postData.id} open={isOpen} onClose={onCloseHandler} postData={postData} endCursorPostId={endCursorPostId}/>
            </ModalRadix>
        </>
    )
}

export default MyProfile
