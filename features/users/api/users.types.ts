export type Avatar = {
    url: string;
    width: number;
    height: number;
    fileSize: number;
    createdAt: string; // ISO string
  }
  
  export type User = {
    id: number;
    userName: string;
    firstName: string;
    lastName: string;
    avatars: Avatar[];
    createdAt: string;
  }
  
  export type UsersResponse = {
    totalCount: number;
    pagesCount: number;
    page: number;
    pageSize: number;
    prevCursor: number;
    nextCursor: number;
    items: User[]; 
  }
  

  export type UsersQueryParams =  {
    search?: string;
    pageSize?: number;
    pageNumber?: number;
    cursor?: number;
  }
  

export type UserByName = {
  id: number;
  userName: string;
  firstName: string;
  lastName: string;
  city: string;
  country: string;
  region: string;
  dateOfBirth: string; // ISO string
  aboutMe: string;
  avatars: Avatar[];
  isFollowing: boolean;
  isFollowedBy: boolean;
  followingCount: number;
  followersCount: number;
  publicationsCount: number;
};

