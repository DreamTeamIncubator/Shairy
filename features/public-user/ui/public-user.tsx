import Image from 'next/image'
import ImageWithoutAvatar from '../../../assets/icons/noImg.png'
import { PropsType } from '../types'
import s from '../ui/publicUser.module.css'
export const PublicUser = (props: PropsType) => {
  const { additionalData, profileData } = props
  console.log(additionalData)

  return (
    <div>
      <div className={s.mainInformationBlock}>
        {profileData.avatars.length ? (
          <Image
            className={s.avatar}
            src={profileData.avatars[0].url}
            alt={'avatar'}
            width={204}
            height={204}
          />
        ) : (
          <Image
            className={s.avatar}
            alt="posts"
            src={ImageWithoutAvatar}
            width={204}
            height={204}
          />
        )}
        <div className={s.profileDescription}>
          <h1> {profileData.userName}</h1>
          <div className={s.userStats}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <p>{profileData.userMetadata.followers}</p>
              <p>Followers </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <p>{profileData.userMetadata.following}</p>
              <p>Following </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <p>{profileData.userMetadata.publications}</p>
              <p>Publications </p>
            </div>
          </div>
          {/* <p>{profileData.description}</p> */}

          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati voluptate tenetur
            facilis eius. Delectus sint pariatur ad atque molestias fugit, accusamus mollitia
            explicabo. Lorem ipsum dolor sit amet consectetur adipisicing elit. !!!Это хардкод если
            что!!!
          </p>
        </div>
      </div>
      <div className={s.postsBlock}>
        {additionalData.items.map((post) => (
          <div
            style={{
              display: 'flex',

              flexDirection: 'row',
              justifyContent: 'center',
              backgroundColor: 'white',
              border: 'black 2px solid',
            }}
            key={post.id}>
            {/* {post.description} */}
            {post.images.map((image) => (
              <Image alt="posts" key={image.createdAt} src={image.url} width={250} height={250} />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
