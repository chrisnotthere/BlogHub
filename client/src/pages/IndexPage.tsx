import { useEffect, useState } from "react";
import { Post } from '../types/Post';

function IndexPage() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:5000/posts");
      const data = await response.json();
      console.log(data)
      setPosts(data.data);
    };
    fetchData();
  }, []);


  return (
    <div>
      <h1>Posts</h1>
      {posts.map((post: Post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
}

export default IndexPage;
