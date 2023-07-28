import { Post } from "../../types/Post";
import { Link, useNavigate } from "react-router-dom";
import DOMPurify from "dompurify";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

interface PostComponentProps {
  post: Post;
  handleDelete: (id: number) => void;
}

export function PostComponent({ post, handleDelete }: PostComponentProps) {
  const { userInfo } = useContext(UserContext);
  const navigate = useNavigate();

  // check if user is admin or author of post
  const handleEdit = (postId: number) => {
    if (userInfo.role !== "admin" && userInfo.user_id !== post.user_id) {
      alert("Only admins or the post's author can edit the post.");
      return;
    }

    // Redirect to edit page
    navigate(`/edit-post/${postId}`);
  };

  // check if user is admin or author of post
  const handlePostDelete = (postId: number) => {
    if (userInfo.role !== "admin" && userInfo.user_id !== post.user_id) {
      alert("Only admins or the post's author can delete the post.");
      return;
    }

    // Perform deletion
    handleDelete(postId);
  };

  return (
    <div className="post">
      <Link to={`/post/${post.id}`}>
        <img
          alt={post.title}
          className="post-cover"
          src={"http://localhost:5000/" + (post.image || "images/default.webp")}
        />
      </Link>
      <div className="post-head">
        <Link to={`/post/${post.id}`}>
          <h2>{post.title}</h2>
        </Link>
        <div className="icons">
          <svg
            onClick={() => handleEdit(post.id)}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="edit-icon w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
            />
          </svg>
          <svg
            onClick={() => handlePostDelete(post.id)}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="delete-icon w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            />
          </svg>
        </div>
      </div>
      <div
        className="content"
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(post.content),
        }}
      />
      <p className="author">By {post.author}</p>
    </div>
  );
}
