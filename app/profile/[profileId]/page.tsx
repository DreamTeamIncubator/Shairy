// app/public-user/profile/[profileId]/page.tsx
import Image from 'next/image'
import ImageWithoutAvatar from '../../../assets/icons/noImg.png'

export default async function PublicProfilePage({ params }: { params: { profileId: string } }) {
  const { profileId } = await params

  // Запрос к вашему API для получения данных профиля
  const res = await fetch(`https://inctagram.work/api/v1/public-user/profile/${profileId}`)
  ////ya.brokkoli
  const profileData = await res.json()
  console.log(profileData)

  const additionalDataRes = await fetch(
    `https://inctagram.work/api/v1/public-posts/user/${profileId}/`
  )
  const additionalData = await additionalDataRes.json()

  console.log(additionalData)

  // Если профиль не найден, можно вернуть 404
  if (!profileData) {
    return <div>Profile not found</div>
  }
  return (
    <div style={{ backgroundColor: 'red' }}>
      {profileData.avatars.length ? (
        <Image src={profileData.avatars[0]} alt={'avatar'} width={1200} height={800} />
      ) : (
        <Image
          style={{ borderRadius: 30, marginTop: '100px' }}
          alt="posts"
          src={ImageWithoutAvatar}
          width={204}
          height={204}
        />
      )}
      <h1> userName {profileData.userName}</h1>
      <p>Followers: {profileData.userMetadata.followers}</p>
      <p>Following: {profileData.userMetadata.following}</p>
      <p>Publications: {profileData.userMetadata.publications}</p>
      <p>{profileData.description}</p>
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
  )
}
