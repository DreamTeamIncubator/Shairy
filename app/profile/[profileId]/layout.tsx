import { getAdditionalData, getProfilePublicUser } from '@/features/public-user/api/public-userApi'
import { PublicUser } from '@/features/public-user/ui/public-user'

export default async function ProfileLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { profileId: string }
}) {
  const { profileId } = params
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
}
