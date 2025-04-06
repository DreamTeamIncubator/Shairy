'use client'

import Image from 'next/image'
import s from './Post.module.scss'
import noImg from '@/assets/icons/noImg.png'
import { PostType } from '../types'
import { formatDate } from '@/shared/lib/formatDate'
import Comments from '../../comments/ui/Comments'
import { CommentsType } from '../../comments/types'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import arrowLeft from '@/public/arrowLeft.svg'
import arrowRight from '@/public/arrowRight.svg'
import 'swiper/css/navigation'

type PostProps = {
  post: PostType
  comments: CommentsType
}

const testImg = [noImg, noImg, noImg, noImg, noImg]

export const PublicPost = ({ post, comments }: PostProps) => {
  // const firstThreePhotos = testImg.slice(0, 3) //test
  const firstThreePhotos = post.avatarWhoLikes.slice(0, 3)
  console.log(post)

  return (
    <div key={post.id} className={s.post}>
      <div className={s.postImage}>
        {post.images.length > 1 ? (
          <div className={s.swiperWrapper}>
            <Swiper
              modules={[Navigation, Pagination]}
              navigation={{
                nextEl: `.${s.customNext}`,
                prevEl: `.${s.customPrev}`,
              }}
              pagination={{
                clickable: true,
                el: `.${s.pagination}`, // Указываем кастомный элемент
                bulletClass: `${s.bullet}`, // Класс для точек
                bulletActiveClass: `${s.bulletActive}`, // Класс для активной точки
              }}
              spaceBetween={20}
              slidesPerView={1}
              className={s.swiperContainer}>
              {post.images.map((image, i) => (
                <SwiperSlide key={i} className={s.slide}>
                  <Image
                    src={image.url}
                    alt="This is image of post"
                    width={490}
                    height={562}
                    className={s.image}
                  />
                </SwiperSlide>
              ))}
              <div className={`${s.customPrev} ${s.navButton}`}>
                <Image width={40} height={40} src={arrowLeft} alt="arrowLeft" />
              </div>
              <div className={`${s.customNext} ${s.navButton}`}>
                <Image width={40} height={40} src={arrowRight} alt="arrowRight" />
              </div>
              <div className={`${s.pagination}`} />
            </Swiper>
          </div>
        ) : (
          <Image
            src={post.images.length > 0 ? post.images[0].url : noImg}
            alt="This is image of post"
            width={490}
            height={562}
            className={s.image}
          />
        )}
      </div>
      <div>
        <div className={s.commentMain}>
          <Image
            src={post.avatarOwner ? post.avatarOwner : noImg}
            alt=""
            width={36}
            height={36}
            style={{ borderRadius: '50%', objectFit: 'cover' }}
          />
          <span className={s.userName}>{post.userName}</span>
        </div>
        <Comments comments={comments} post={post} />
        <div>
          <div className={s.likes}>
            <div style={{ display: 'flex' }}>
              {firstThreePhotos.length > 0 ? (
                firstThreePhotos.map((photo, i) => (
                  <Image
                    key={i}
                    src={photo || noImg}
                    alt=""
                    width={24}
                    height={24}
                    style={{
                      borderRadius: '50%',
                      objectFit: 'cover',
                      marginLeft: i > 0 ? '-9px' : '0',
                      zIndex: firstThreePhotos.length - i,
                    }}
                  />
                ))
              ) : (
                <Image
                  src={noImg}
                  alt=""
                  width={24}
                  height={24}
                  style={{ borderRadius: '50%', objectFit: 'cover' }}
                />
              )}
            </div>
            <span>{`${post.likesCount} "Like"`}</span>
          </div>
          <time className={s.time}>{formatDate(post.createdAt)}</time>
        </div>
      </div>
    </div>
  )
}
