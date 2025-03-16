import { useState } from "react";
import { useAddCommentMutation, useAddCommentAnswerMutation } from "@/features/comments/api/comments";


export const useCommentActions = (postId: number) => {
  const [content, setContent] = useState("");
  const [isReplying, setIsReplying] = useState(false);
  const [replyToId, setReplyToId] = useState<number | null>(null);

  const [addComment] = useAddCommentMutation();
  const [addAnswer] = useAddCommentAnswerMutation();

  const handleAddCommentOrAnswer = async () => {
    if (!content.trim()) return;

    try {
      if (isReplying && replyToId !== null) {
        await addAnswer({ postId, commentId: replyToId, content, });
      } else {
        await addComment({ postId, content });
      }
      setContent("");
      setIsReplying(false);
      setReplyToId(null);
    } catch (error) {
      console.error("Ошибка при добавлении комментария/ответа:", error);
    }
  };

  const handleAnswerClick = (id: number, username: string, isAnswer = false) => {
    setIsReplying(true);
    setReplyToId(id);
    setContent(`@${username} `);
  };

  return {
    content,
    setContent,
    isReplying,
    handleAddCommentOrAnswer,
    handleAnswerClick,
  };
};

