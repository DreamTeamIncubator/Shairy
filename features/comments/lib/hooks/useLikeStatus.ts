import { useState } from "react";

type LikeStatusProps = {
  initialIsLiked: boolean;
  initialLikeCount: number;
  onLikeToggle: (id: number, isLiked: boolean) => void;
};

export const useLikeStatus = ({ initialIsLiked, initialLikeCount, onLikeToggle }: LikeStatusProps) => {
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [likeCount, setLikeCount] = useState(initialLikeCount);

  const toggleLike = (id: number) => {
    const newIsLiked = !isLiked;
    const updatedLikeCount = newIsLiked ? likeCount + 1 : likeCount - 1;

    setIsLiked(newIsLiked);
    setLikeCount(updatedLikeCount);
    
    onLikeToggle(id, newIsLiked);
  };

  return { isLiked, likeCount, toggleLike };
};
