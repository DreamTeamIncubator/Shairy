// import { PublicPost } from '@/app/page'
import { PublicPostForUnregisteredUser } from '../publicPostForUnregisteredUser/PublicPostForUnregisteredUser'
import styles from './PublicPostList.module.scss'
import { ResponseAllPosts } from '@/features/posts/api/post.types'

export const PublicPostList = ({ lastPosts }: { lastPosts: ResponseAllPosts }) => {
  return (
    <>
      <div className={styles.postsBlock}>
        {lastPosts.items.map((postItem) => (
          <div key={postItem.id}>
            <PublicPostForUnregisteredUser postItem={postItem} />
          </div>
        ))}
      </div>
    </>
  )
}
