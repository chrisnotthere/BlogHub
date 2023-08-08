import { useCallback, useEffect, useState } from "react";
import { Post } from "../types/Post";
import styles from "../assets/styles/indexpage.module.css";
import { PostComponent } from "./components/Post";
import FilterAndSort from "./components/FilterAndSort";

function IndexPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = async () => {
    const response = await fetch("http://localhost:5000/posts/allPosts");

    if (response.ok) {
      const data = await response.json();
      setPosts(data.data);
      setFilteredPosts(data.data);
      console.log("all posts: ", data);
    } else {
      const message = await response.text();
      setError(message);
    }
  };

  // fetch all posts
  useEffect(() => {
    fetchPosts();
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
          credentials: "include",
        }
      );

      if (response.ok) {
        const data = await response.json();
        setPosts(posts.filter((post) => post.id !== id));
      } else {
        const message = await response.text();
        setError(message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // filter the posts based on the selected tags
  const filterPostsByTags = useCallback(
    (tags: string[]) => {
      console.log("Filtering with tags:", tags);
      console.log("Checking if no posts to display", filteredPosts.length);

      // if no tags are selected, show all posts
      if (tags.length === 0) {
        setFilteredPosts(posts);
        return;
      }

      // filter posts by tags
      const filtered = posts.filter((post) => {
        return tags.some(
          (tag) => post.tags && post.tags.split(",").includes(tag)
        );
      });
      // console.log("Filtered posts:", filtered);
      setFilteredPosts(filtered);
    },
    [posts]
  );

  if (error) {
    return <div>{error}</div>;
  }

  // TODO: fix this
  // if (filteredPosts.length === 0) {
  //   return (
  //     <div className={styles.indexContainer}>
  //       <FilterAndSort filterPostsByTags={filterPostsByTags} />
  //       <div className={styles.postContainer}>
  //         <h2>No Posts to display</h2>
  //         <p>Be the first to create a post!</p>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className={styles.indexContainer}>
      <div className={styles.sortContainer}>
        <FilterAndSort filterPostsByTags={filterPostsByTags} />
      </div>
      <div className={styles.postContainer}>
        {[...filteredPosts].reverse().map((post: Post) => (
          <PostComponent
            key={post.id}
            post={post}
            handleDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}

export default IndexPage;
