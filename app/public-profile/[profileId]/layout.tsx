import { getAdditionalData, getProfilePublicUser } from '@/features/public-user/api/public-userApi'
import { PublicUser } from '@/features/public-user/ui/public-user'
import { notFound } from 'next/navigation'

export default async function ProfileLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { profileId: string }
}) {
  const { profileId } = params
  try {
    const [profileData, additionalData] = await Promise.all([
      getProfilePublicUser(+profileId),
      getAdditionalData(+profileId),
    ])
    if (!profileData) {
      return <div>Profile not found</div>
    }

    return (
      <div>
        <PublicUser profileData={profileData} additionalData={additionalData} />
        {children}
      </div>
    )
  } catch (error) {
    const customError = error as { message: string }
    if (customError.message === 'Профиль не найден') {
      return notFound()
    }
    return <div>Что-то пошло не так. Пожалуйста, попробуйте позже.</div>
  }
}
