export type Avatars = {
    url: string;
    width: number;
    height: number;
    fileSize: number;
    createdAt: string;
}

export interface UserMetadata {
    following: number;
    followers: number;
    publications: number;
}

export type ResponceProfile  = {
    id: number;
    userName: string;
    aboutMe: string;
    avatars: Avatars[];
    userMetadata: UserMetadata;
    hasPaymentSubscription: boolean;
}

export type UploadAvatarResponse = {
    avatars: Avatars[];
};

export type UpdateProfileRequest = Partial<{
    id: number;
    userName: string;
    firstName: string;
    lastName: string;
    city: string;
    country: string;
    region: string;
    dateOfBirth: string;
    aboutMe: string;
  }>;