import styles from './page.module.css'
import { UserCounter } from '@/shared/ui/UserCounter/UserCounter'
import { getFourLastPosts } from '@/features/posts/api/fourLastPostsAPI'
import { ResponseAllPosts } from '@/features/posts/api/post.types'
import { PublicPostList } from '@/features/public-posts/publicPostList/PublicPostsList'

export default async function Home() {
  const lastPosts: ResponseAllPosts = await getFourLastPosts()
  return (
    <>
      <div className={styles.content}>
        <UserCounter users={lastPosts.totalUsers} />
        <PublicPostList lastPosts={lastPosts} />
      </div>
    </>
  )
}
