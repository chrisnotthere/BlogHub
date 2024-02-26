import { Post } from "../../types/Post";
import { Link, useNavigate } from "react-router-dom";
import DOMPurify from "dompurify";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";

interface PostComponentProps {
  post: Post;
  handleDelete: (id: number) => void;
}

export function PostComponent({ post, handleDelete }: PostComponentProps) {
  const [avgRating, setAvgRating] = useState<number | null>(null);
  const [numberOfRatings, setNumberOfRatings] = useState<number | null>(null);
  const [numberOfComments, setNumberOfComments] = useState<number | null>(null);
  const [tags, setTags] = useState<string[]>([]);
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

  // get rating info, average and number of ratings
  const fetchRatingSummary = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_HEROKU_URL}rating/ratingSummary/${post.id}`
    );
    if (response.ok) {
      const data = await response.json();
      setAvgRating(Number(data.data.averageRating));
      setNumberOfRatings(Number(data.data.numberOfRatings));
    } else {
      const err = await response.text();
      console.log(err);
    }
  };

  const fetchNumberOfComments = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_HEROKU_URL}comment/allComments/${post.id}`
    );
    if (response.ok) {
      const data = await response.json();
      setNumberOfComments(data.data.length);
    } else {
      const err = await response.text();
      console.log(err);
    }
  };

  useEffect(() => {
    fetchRatingSummary();
    fetchNumberOfComments();
    if (post.tags) setTags(post.tags.split(","));
  }, []);

  return (
    <div className="flex flex-col gap-4 p-4 rounded bg-white shadow">
      <Link to={`/post/${post.id}`}>
        <img
          alt={post.title}
          className="w-full max-h-52 object-cover rounded-lg transition-opacity duration-300 ease-in-out hover:opacity-70"
          src={process.env.REACT_APP_HEROKU_URL + (post.image || "images/default.webp")}
        />
      </Link>
      <div className="flex flex-col justify-between items-center">
        {/* post title */}
        <Link to={`/post/${post.id}`} className="text-deep-sea hover:underline hover:opacity-70">
          <h2 className="text-xl text-center">{post.title}</h2>
        </Link>
        <div className="flex gap-4 align justify-end w-full">
          {/* Edit Icon */}
          <svg
            onClick={() => handleEdit(post.id)}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 cursor-pointer hover:text-blue-700"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
            />
          </svg>
          {/* Delete Icon */}
          <svg
            onClick={() => handlePostDelete(post.id)}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 cursor-pointer hover:text-red-600"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            />
          </svg>
        </div>
      </div>

      {/* post content */}
      <Link to={`/post/${post.id}`} >
        <div className="flex justify-between cursor-pointer -mt-2">
          <div
            className="post-content w-full break-words overflow-hidden relative max-h-18 line-clamp-3 text-neutral2 "
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(post.content),
            }}
          />
        </div>
      </Link>

      {/* post tags */}
      {tags.length > 0 && (
        <div className="flex items-center flex-wrap gap-2">
          {tags.map((tag) => (
            <div key={tag} className="bg-lavender p-2 rounded text-sm transition-colors duration-300 ease-in-out hover:bg-lavender-500">
              {tag}
            </div>
          ))}
        </div>
      )}

      {/* post author */}
      <div className="flex justify-between items-center">
        <p className="text-gray-600 text-sm">By {post.author}</p>
        <div className="text-right text-sm">
          <p>
            {numberOfRatings === 0
              ? "0 Reviews"
              : `${numberOfRatings} ${numberOfRatings === 1 ? "Review" : "Reviews"} - ${avgRating ? avgRating.toFixed(1) : "N/A"} Average`}
          </p>
          {/* comments */}
          <p className="text-teal-500 hover:underline">
            <Link to={`/post/${post.id}#comments`}>
              {numberOfComments === 0
                ? "0 Comments"
                : `${numberOfComments} ${numberOfComments === 1 ? "Comment" : "Comments"}`}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
