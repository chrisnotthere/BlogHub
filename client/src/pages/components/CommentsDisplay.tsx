import { useEffect, useState } from "react";
import styles from "../../assets/styles/comment-display.module.css";
import { Comment } from "../../types/Comment";

interface CommentDisplayProps {
  comments: Comment[];
  deleteComment: (id: number, user_id: number) => void;
  toggleLike: (commentId: number, userId: number) => void;
  fetchComments: () => void;
  userId: number;
}

export default function CommentsDisplay({
  comments,
  deleteComment,
  toggleLike,
  fetchComments,
  userId,
}: CommentDisplayProps) {
  const [userLiked, setUserLiked] = useState<Record<number, boolean>>({});

  function formatDate(dateString?: string): string {
    if (!dateString) {
      throw new Error("Date string is undefined");
    }
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

  function formatContent(input: string): string {
    return input.replace(/\n/g, '<br />');
  }

  const handleLikeClick = (commentId: number, userId: number) => {
    toggleLike(commentId, userId);
    fetchComments();
  };

  const checkUserLiked = async (userId: number, commentId: number) => {
    try {
      const response = await fetch(
        "http://localhost:5000/comment/checkIfUserLiked",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId, commentId }),
        }
      );
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  // Checks if the current user has liked each comment in the list.
  // It then sets the 'userLiked' state with an object containing the liked status for each comment ID.
  // This is because the comments are rendered in reverse order, so the index of the comment in the array
  // does not correspond to the comment ID.
  useEffect(() => {
    // console.log("checking if user has liked comment");

    Promise.all(
      comments.map((comment) => checkUserLiked(userId, comment.id ?? 0))
    ).then((likes) => {
      const likesObject = likes.reduce((acc, liked, index) => {
        // Get the corresponding comment ID for this index
        const commentId = comments[index].id ?? 0;
        // Set this comment ID's liked status in the accumulator object
        acc[commentId] = liked;
        return acc;
      }, {} as Record<number, boolean>);
      setUserLiked(likesObject);
    });
  }, [comments, userId]);

  // scroll to comments if URL hash is '#comments'
  useEffect(() => {
    const hash = window.location.hash;
    if (hash === '#comments') {
      const element = document.getElementById('comments') as HTMLElement;
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, []);

  return (
    <div className={styles.commentsContainer}>
      <h1 id="comments" className={styles.title}>Comments</h1>
      {Array.isArray(comments) && comments.length === 0 ? (
        <div className={styles.noComments}>
          <p>No comments yet.</p>
          <p>Be the first to share your thoughts!</p>
        </div>
      ) : (
        comments
          .slice(0)
          .reverse()
          .map((comment) => (
            <div key={comment.id} className={styles.commentContainer}>
              <div className={styles.commentHeader}>
                <h3>Author: {comment.author}</h3>
                <span>{formatDate(comment.created_at)}</span>
              </div>
              <div
                className={styles.commentContent}
                dangerouslySetInnerHTML={{
                  __html: formatContent(comment.content),
                }}
              />
              <div className={styles.commentFoot}>
                <div
                  className={styles.like}
                  onClick={() =>
                    comment.id && handleLikeClick(comment.id, userId)
                  }
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill={userLiked[comment.id ?? 0] ? "red" : "none"}
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className={styles.likeIcon}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                    />
                  </svg>
                  <span>Likes: {comment.likes}</span>
                </div>
                <div className={styles.delete}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className={styles.deleteIcon}
                    onClick={() =>
                      comment.id && deleteComment(comment.id, comment.user_id)
                    }
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                </div>
              </div>
            </div>
          ))
        )}
    </div>
  );
}
