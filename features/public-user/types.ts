type Avatar = {
  url: string
  width: number
  height: number
  fileSize: number
  createdAt: string // ISO format date
}

type UserMetadata = {
  following: number
  followers: number
  publications: number
}

type UserProfileData = {
  id: number
  userName: string
  aboutMe: string
  avatars: Avatar[]
  userMetadata: UserMetadata
  hasPaymentSubscription: boolean
}

export type PropsType = {
  profileData: UserProfileData
  additionalData: AdditionalData
}
type Image = {
  url: string
  width: number
  height: number
  fileSize: number
  createdAt: string
  uploadId: string
}

type Owner = {
  firstName: string
  lastName: string
}

export type Item = {
  id: number
  userName: string
  description: string
  location: string
  images: Image[]
  createdAt: string // ISO format date
  updatedAt: string // ISO format date
  ownerId: number
  avatarOwner: string
  owner: Owner
}

type AdditionalData = {
  totalCount: number
  pageSize: number
  totalUsers: number
  items: Item[]
}
