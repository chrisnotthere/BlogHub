import { useEffect, useState } from "react";
import { Post } from "../types/Post";
import DOMPurify from "dompurify";
import "../assets/styles/indexpage.css";

function IndexPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:5000/posts/allPosts");

      if (response.ok) {
        const data = await response.json();
        setPosts(data.data);
        console.log("post data: ", data);
      } else {
        const message = await response.text();
        setError(message);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  if (posts.length === 0) {
    return (
      <div>
        <h2>No Posts to display</h2>
        <p>Be the first to create a post!</p>
      </div>
    );
  }

  return (
    <div>
      <div className="post-container">
        {[...posts].reverse().map((post: Post) => (
          <div className="post" key={post.id}>
            <div className="post-head">
              <h2>{post.title}</h2>
              <svg
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
            <div
              className="content"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(post.content),
              }}
            />
            <p className="author">By {post.author}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default IndexPage;
