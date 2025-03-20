import Image from 'next/image'
import ImageWithoutAvatar from '../../../assets/icons/noImg.png'
import { getAdditionalData, getProfilePublicUser } from '@/features/public-user/api/public-userApi'
type PageProps = {
  params: {
    profileId: string
  }
}
export default async function PublicProfilePage({ params }: PageProps) {
  const { profileId } = await params
  const [profileData, additionalData] = await Promise.all([
    getProfilePublicUser(+profileId),
    getAdditionalData(+profileId),
  ])

  if (!profileData) {
    return <div>Profile not found</div>
  }
  return (
    <div style={{ backgroundColor: 'green', display: 'flex', justifyContent: 'center' }}>
      <div style={{ backgroundColor: 'red' }}>
        <div
          style={{
            backgroundColor: 'pink',
            display: 'flex',
            justifyContent: 'row',
            padding: '30px',
          }}>
          {profileData.avatars.length ? (
            <Image src={profileData.avatars[0]} alt={'avatar'} width={204} height={204} />
          ) : (
            <Image
              style={{ borderRadius: 30 }}
              alt="posts"
              src={ImageWithoutAvatar}
              width={204}
              height={204}
            />
          )}
          <div
            style={{
              display: 'flex',
              backgroundColor: 'yellow',
              flexDirection: 'column',
              paddingInlineStart: '30px',
            }}>
            <h1> {profileData.userName}</h1>
            <div
              style={{
                backgroundColor: 'green',
                display: 'flex',
                marginTop: '20px',
                marginBottom: '30px',
                gap: '100px',
              }}>
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
              explicabo. Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
          </div>
        </div>
        {/* Отображение публикаций и других данных */}
        {additionalData.items.map((post: any) => (
          <div key={post.id}>
            {post.description}
            {post.images.map((image: any, index: number) => (
              <Image alt="posts" key={index} src={image.url} width={234} height={228} />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
