export type CommentsType = {
  pageSize: number;
  totalCount: number;
  notReadCount: number;
  items: Item[];
};

export type Item = {
  id: number;
  postId: number;
  from: From;
  content: string;
  createdAt: Date;
  answerCount: number;
  likeCount: number;
  isLiked: boolean;
};

export type From = {
  id: number;
  username: string;
  avatars: Avatar[];
};

export type Avatar = {
  url: string;
};
