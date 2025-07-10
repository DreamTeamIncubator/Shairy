import s from './Post.module.scss'
import { Swiper, SwiperSlide } from 'swiper/react'
import Image from 'next/image'
import arrowLeft from '@/public/arrowLeft.svg'
import arrowRight from '@/public/arrowRight.svg'
import { Navigation, Pagination } from 'swiper/modules'
import 'swiper/css/navigation'
import Ellipse from '@/assets/icons/Ellipse.svg'
import noImg from '@/assets/icons/noImg.png'
import heart from '@/public/heart.svg'
import redHeart from '@/public/redHeart.svg'
import message from '@/public/message.svg'
import send from '@/public/send.svg'
import save from '@/public/save.svg'
import { Item } from '../../api/types'
import { getTimeAgo } from '@/shared/lib/getTimeAgo'
import Comments from '@/features/public-posts/comments/ui/Comments'
import { TextArea } from '@/shared/ui/TextArea/TextArea'
import { Button } from '@/shared/ui/Button/Button'
import { useState } from 'react'

type PostProps = {
  data: Item
}

export const Post = ({ data }: PostProps) => {
  const [content, setContent] = useState('')
  const firstThreePhotos = data.avatarWhoLikes.slice(0, 3)

  return (
    <div className={s.container}>
      <div className={s.headerBlock}>
        <Image
          src={data.avatarOwner ? data.avatarOwner : noImg}
          alt="avatarOwner"
          width={36}
          height={36}
        />
        <span>{data.userName}</span>
        <Image src={Ellipse} width={4} height={4} alt="status" />
        <time>{getTimeAgo(data.createdAt)}</time>
      </div>
      {data.images.length > 1 ? (
        <div className={s.swiperWrapper}>
          <Swiper
            modules={[Navigation, Pagination]}
            navigation={{
              nextEl: `.${s.customNext}`,
              prevEl: `.${s.customPrev}`,
            }}
            pagination={{
              clickable: true,
              el: `.${s.pagination}`,
              bulletClass: `${s.bullet}`,
              bulletActiveClass: `${s.bulletActive}`,
            }}
            spaceBetween={20}
            slidesPerView={1}
            className={s.swiperContainer}>
            {data.images.map((image, i) => (
              <SwiperSlide key={i} className={s.slide}>
                <Image
                  src={image.url}
                  alt="This is image of post"
                  width={491}
                  height={504}
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
          src={data.images.length > 0 ? data.images[0].url : noImg}
          alt="This is image of post"
          width={490}
          height={562}
          className={s.image}
        />
      )}
      <div>
        <div className={s.socialPanel}>
          <div>
            <Image src={data.isLiked ? redHeart : heart} width={24} height={24} alt="isLike" />
            <Image src={message} width={24} height={24} alt="message" />
            <Image src={send} width={24} height={24} alt="send" />
          </div>
          <div>
            <Image src={save} width={24} height={24} alt="save" />
          </div>
        </div>
        <div className={s.userBlock}>
          <Image src={data.avatarOwner ? data.avatarOwner : noImg} alt="" width={36} height={36} />
          <div>
            <span className={s.userName}>
              <b>{data.userName}</b> {data.description}
            </span>
          </div>
        </div>
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
          <span>{`${data.likesCount} "Like"`}</span>
        </div>
      </div>
      <div className={s.textCommentArea}>
        <p>View All Comments ({})</p>
        <div className={s.commentContent}>
          <TextArea
            className={s.commentTextArea}
            value={content}
            onChange={(e) => setContent(e.currentTarget.value)}
            placeholder="Add a comment..."
          />
          <Button
            className={s.buttonPublish}
            variant="textButton"
            // onClick={handleAddCommentOrAnswer}
          >
            Publish
          </Button>
        </div>
      </div>
    </div>
  )
}
