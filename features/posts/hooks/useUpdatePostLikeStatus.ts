import { useState, useEffect } from 'react';
import { useUpdatePostLikeStatusMutation } from '../api/post';


export const useUpdatePostLikeStatus = (postId: number, initialIsLiked: boolean, initialLikesCount: number) => {
    const [isLiked, setIsLiked] = useState(initialIsLiked);
    const [likesCount, setLikesCount] = useState(initialLikesCount);
    const [updatePostLikes] = useUpdatePostLikeStatusMutation();

    useEffect(() => {
        setIsLiked(initialIsLiked);
        setLikesCount(initialLikesCount);
    }, [initialIsLiked, initialLikesCount]);

    const handleUpdatePostLikeStatus = async () => {
        try {
            const newLikeStatus = isLiked ? 'NONE' : 'LIKE';

            setIsLiked((prev) => !prev);
            setLikesCount((prev) => (isLiked ? prev - 1 : prev + 1));

            await updatePostLikes({ postId, likeStatus: newLikeStatus });
        } catch (error) {
            console.error("Ошибка при обновлении лайка:", error);
        }
    };

    return { isLiked, likesCount, handleUpdatePostLikeStatus };
};
