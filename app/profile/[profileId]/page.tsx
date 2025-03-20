import { getAdditionalData, getProfilePublicUser } from '@/features/public-user/api/public-userApi'
import { PublicUser } from '@/features/public-user/ui/public-user'

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
  return <PublicUser profileData={profileData} additionalData={additionalData} />
}
