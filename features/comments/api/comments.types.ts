export type Avatar = {
    url: string
    width: number
    height: number
    fileSize: number
    createdAt: string
}

export type From = {
    id: number
    username: string
    avatars: Avatar[] 
};

export type CommentItem = {
    id: number
    postId: number
    from: From
    content: string
    createdAt: string
    answerCount: number
    likeCount: number
    isLiked: boolean
};


export type CommentAnswerItem = Omit<CommentItem, 'postId' | 'answerCount'> & {
    commentId: number
};

export type CommentsResponseType = {
    pageSize: number
    totalCount: number
    notReadCount: number
    items: CommentItem[]
};

export type CommentsAnswerResponseType = {
    pageSize: number
    totalCount: number
    notReadCount: number
    items: CommentAnswerItem[]
};

export type LikeUser = {
    id: number
    userId: number 
    userName: string
    createdAt: string 
    avatars: Avatar[] 
    isFollowing: boolean
    isFollowedBy: boolean
};


export type LikesResponseType = {
    pageSize: number
    totalCount: number
    notReadCount: number
    items: LikeUser[]
};