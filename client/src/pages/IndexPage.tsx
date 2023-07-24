import { useEffect, useState } from "react";
import { Post } from "../types/Post";
import DOMPurify from 'dompurify';

function IndexPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:5000/posts/allPosts");

      if (response.ok) {
        const data = await response.json();
        setPosts(data.data);
        console.log('post data: ', data)
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
    )
  }

  return (
    <div>
      <h1>Posts</h1>
      <br />
      {posts.map((post: Post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content) }} />
          <p>By {post.author}</p>
        </div>
      ))}
    </div>
  );
}

export default IndexPage;
