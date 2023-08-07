import { useState, useEffect, useContext } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { Post } from "../types/Post";
import DOMPurify from "dompurify";
import styles from "../assets/styles/postpage.module.css";
import { UserContext } from "../context/UserContext";
import RatingComponent from "./components/Rating";
import CommentEditor from "./components/CommentEditor";
import CommentsDisplay from "./components/CommentsDisplay";
import { Comment } from "../types/Comment";

function PostPage() {
  let { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [redirect, setRedirect] = useState<boolean>(false);
  const { userInfo } = useContext(UserContext);
  const navigate = useNavigate();

  // fetch individual post data
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:5000/posts/post/${id}`);

      if (response.ok) {
        const data = await response.json();
        setPost(data.data);
      } else {
        const err = await response.text();
        console.log(err);
      }
    };

    fetchData();
  }, [id]);

  // delete post if authorized
  const handleDelete = async (id: number) => {
    if (userInfo.role !== "admin" && userInfo.user_id !== post?.user_id) {
      alert("You can only delete posts you've authored.");
      return;
    }

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/posts/deletePost/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setRedirect(true);
      } else {
        const err = await response.text();
        console.log(err);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // edit post if authorized
  const handleEdit = (id: number) => {
    if (userInfo.role !== "admin" && userInfo.user_id !== post?.user_id) {
      alert("You can only edit posts you've authored.");
      return;
    }

    navigate(`/edit-post/${id}`);
  };

  const fetchComments = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/comment/allComments/${id}`
      );

      if (response.ok) {
        const data = await response.json();
        setComments(data.data);
        // console.log(data);
      } else {
        const err = await response.text();
        console.log(err);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // fetch comments
  useEffect(() => {
    fetchComments();
  }, [id]);

  // delete comment
  const deleteComment = async (id: number, user_id: number) => {
    if (userInfo.role !== "admin" && userInfo.user_id !== user_id) {
      alert("You can only delete comments you've authored.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/comment/delete/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        console.log("comment deleted");
        fetchComments();
      } else {
        const err = await response.text();
        console.log(err);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const toggleLike = async (commentId: number, userId: number) => {
    if (!userInfo.isLoggedIn) {
      alert("You must be logged in to like a comment.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/comment/likeToggle`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ commentId, userId }),
      });

      if (!response.ok) {
        throw new Error("Failed to toggle like");
      }

      fetchComments();
    } catch (error) {
      console.error("Failed to toggle like:", error);
    }
  };

  if (!post) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (redirect) return <Navigate to="/" />;

  return (
    <div className={styles.postPage}>
      <div className={styles.postImage}>
        <img
          alt={post.title}
          className={styles.postCover}
          src={"http://localhost:5000/" + (post.image || "images/default.webp")}
        />
      </div>
      <div className={styles.postTitle}>
        <h2>{post.title}</h2>
      </div>
      <div className={styles.postAuthor}>
        <p>Posted By: {post.author}</p>
      </div>
      <div className={styles.icons}>
        <svg
          onClick={handleEdit.bind(null, post.id)}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={styles.editIcon}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
          />
        </svg>
        <svg
          onClick={handleDelete.bind(null, post.id)}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={styles.deleteIcon}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
          />
        </svg>
      </div>
      <div
        className={styles.postContent}
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(post.content),
        }}
      />

      <div className={styles.commentOrRate}>
        <CommentEditor
          userInfo={userInfo}
          id={id}
          fetchComments={fetchComments}
        />
        <RatingComponent userInfo={userInfo} id={id} />
      </div>
      <CommentsDisplay
        comments={comments}
        deleteComment={deleteComment}
        toggleLike={toggleLike}
        fetchComments={fetchComments}
        userId={userInfo.user_id}
      />
    </div>
  );
}

export default PostPage;
