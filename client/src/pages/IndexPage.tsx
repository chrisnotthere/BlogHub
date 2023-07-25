import { useEffect, useState } from "react";
import { Post } from "../types/Post";
import "../assets/styles/indexpage.css";
import { PostComponent } from "./components/Post";

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

  const handleDelete = async (id: number) => {
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
        const data = await response.json();
        // console.log("delete data: ", data);
        setPosts(posts.filter((post) => post.id !== id));
      } else {
        const message = await response.text();
        setError(message);
      }
    } catch (err) {
      console.log(err);
    }
  };

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
          <PostComponent key={post.id} post={post} handleDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
}

export default IndexPage;
