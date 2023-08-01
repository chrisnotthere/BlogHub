import styles from "../../assets/styles/comment-display.module.css";
import { Comment } from "../../types/Comment";

interface CommentDisplayProps {
  comments: Comment[];
  deleteComment: (id: number) => void;
}

export default function CommentsDisplay({
  comments,
  deleteComment,
}: CommentDisplayProps) {

  function formatDate(dateString?: string): string {
    if (!dateString) {
      throw new Error("Date string is undefined");
    }
    const options: Intl.DateTimeFormatOptions = { 
      year: "numeric", 
      month: "short", 
      day: "numeric", 
      hour: "2-digit", 
      minute: "2-digit" 
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }
  
  return (
    <div className={styles.commentsContainer}>
      <h1 className={styles.title}>Comments</h1>

      {Array.isArray(comments) &&
        comments
          .slice(0)
          .reverse()
          .map((comment) => (
            <div key={comment.id} className={styles.commentContainer}>
              <div className={styles.commentHeader}>
                <h3>Author: {comment.author}</h3>
                <span>{formatDate(comment.created_at)}</span>
              </div>
              <div className={styles.commentContent}>{comment.content}</div>
              <div className={styles.commentFoot}>
                <div className={styles.like}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
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
                    onClick={() => comment.id && deleteComment(comment.id)}
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
          ))}
    </div>
  );
}
