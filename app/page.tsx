import styles from './page.module.css'
import Image from 'next/image'
import userWithoutPhoto from '../assets/icons/withoutAvatar.png'
import { UserCounter } from '@/shared/ui/UserCounter/UserCounter'
import { PostDescription } from '@/features/posts/ui/PostsDescription/PostDescription'
import Link from 'next/link'
// import { Button } from '@/shared/ui/Button/Button';
// import { Input } from '@/components/Input/Input';
// import { Pagination } from '@/components/Pagination/Pagination';
// import { useState } from 'react';
// import { RadixTabs } from '@/shared/ui/Tabs/Tabs';
// import { ReCaptcha } from '@/features/ReCaptcha/ReCaptcha';
// export async function userCount() {
//   const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/public-posts/all`, {
//     next: { revalidate: 60 },
//   })
//   if (response.status === 500) {
//     throw new Error('Ошибка сервера: 500')
//   }

//   if (response.status === 404) {
//     throw new Error('Пост не найден')
//   }

//   if (!response.ok) {
//     throw new Error('Не удалось загрузить страницу')
//   }

//   return await response.json()
// }

export async function getFourLastPosts() {
  const url = new URL(`https://inctagram.work/api/v1/public-posts/all`)

  // Устанавливаем параметры запроса
  url.searchParams.append('pageSize', '4')
  url.searchParams.append('sortDirection', 'desc')

  const response = await fetch(url.toString())

  if (response.status === 500) {
    throw new Error('Ошибка сервера: 500')
  }

  if (response.status === 404) {
    throw new Error('Пост не найден')
  }

  if (!response.ok) {
    throw new Error('Не удалось загрузить страницу')
  }

  return await response.json()
}

export default async function Home() {
  // const resUsers = await userCount()
  const resUsers4 = await getFourLastPosts()
  // const [currentPage, setCurrentPage] = useState(1);
  // const [perPage, setPerPageOptions] = useState<number>(50);
  // const [isCaptchaCompleted, setIsCaptchaCompleted] = useState(false);
  // const sitekey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string;
  console.log(resUsers4)

  // const tabs = [
  //   {
  //     value: 'tab1',
  //     label: 'Account',
  //     content: (
  //       <div>
  //         <h2>Account Details</h2>
  //         <p>Here you can update your account information.</p>
  //       </div>
  //     ),
  //   },
  //   {
  //     value: 'tab2',
  //     label: 'Password',
  //     content: (
  //       <div>
  //         <h2>Change Your Password</h2>
  //         <p>Enter your new password below.</p>
  //         <form>
  //           <div>
  //             <label htmlFor="oldPassword">Old Password:</label>
  //           </div>
  //           <div>
  //             <label htmlFor="newPassword">New Password:</label>
  //           </div>
  //         </form>
  //       </div>
  //     ),
  //   },
  //   {
  //     value: 'tab3',
  //     label: 'Registration',
  //     content: <h2>SomeBigForm</h2>,
  //   },
  // ];

  function formatTimeAgo(isoDate: string) {
    const date = new Date(isoDate)
    const now = new Date()
    const diffInSeconds = Math.floor((now - date) / 1000)

    if (diffInSeconds < 60) {
      return `${diffInSeconds} sec ago`
    }

    const diffInMinutes = Math.floor(diffInSeconds / 60)
    if (diffInMinutes < 60) {
      return `${diffInMinutes} min ago`
    }

    const diffInHours = Math.floor(diffInMinutes / 60)
    if (diffInHours < 24) {
      return `${diffInHours} hours ago`
    }

    const diffInDays = Math.floor(diffInHours / 24)
    return `${diffInDays} days ago`
  }

  return (
    <>
      <div className={styles.content}>
        <div className={styles.usersInfo}>
          <p>Registered users:</p>
          <UserCounter users={resUsers4.totalUsers} />
        </div>
        <div className={styles.postsBlock}>
          {resUsers4.items.map((post) => (
            <div className={styles.postBlock} key={post.id}>
              <Link
                key={post.id}
                href={`/public-profile/${post.ownerId}/public-post/${post.id}`} // Переход на маршрут поста
                scroll={false} // Отключаем прокрутку страницы
                className={styles.postBlock}>
                {' '}
                <Image
                  alt="post"
                  src={post.images[0].url}
                  width={250}
                  height={250}
                  style={{ cursor: 'pointer' }}
                />
              </Link>
              <div className={styles.avatarNameBlock}>
                <Image
                  alt="avatar"
                  src={post.avatarOwner ? post.avatarOwner : userWithoutPhoto}
                  width={36}
                  height={36}
                  style={{ borderRadius: '50%' }}
                />
                <p key={post.id}>{post.userName}</p>
              </div>
              <p className={styles.timeAgo}>{formatTimeAgo(post.createdAt)}</p>

              <PostDescription description={post.description} />
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
