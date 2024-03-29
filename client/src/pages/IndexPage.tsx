import { useCallback, useEffect, useState } from "react";
import { Post } from "../types/Post";
import { PostComponent } from "./components/Post";
import FilterAndSort from "./components/FilterAndSort";
import Pagination from "./components/Pagination";

function IndexPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [error, setError] = useState<string | null>(null);

  // pagination data
  const postsPerPage = 4;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const fetchPosts = async () => {
    const response = await fetch(`${process.env.REACT_APP_HEROKU_URL}posts/allPosts`);

    if (response.ok) {
      const data = await response.json();
      // sort posts by date
      const sortedData = sortPosts(data.data, sortOrder);
      setPosts(sortedData);
      setFilteredPosts(sortedData);
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
        `${process.env.REACT_APP_HEROKU_URL}posts/deletePost/${id}`,
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

  /**
   * Filters posts based on an array of tags. If no tags are provided, all posts will be shown.
   * If tags are provided, only posts that include at least one of the tags will be shown.
   *
   * @param {string[]} tags - An array of tags to filter the posts by.
   */
  const filterPostsByTags = useCallback(
    (tags: string[]) => {
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
      setFilteredPosts(filtered);
      setCurrentPage(1); // reset to the first page
    },
    [posts]
  );

  const sortPosts = (posts: Post[], order: "asc" | "desc"): Post[] => {
    return [...posts].sort((a, b) => {
      const dateA = a.created_at ? new Date(a.created_at).getTime() : 0;
      const dateB = b.created_at ? new Date(b.created_at).getTime() : 0;
      return order === "asc" ? dateA - dateB : dateB - dateA;
    });
  };

  const sortPostsByDate = (order: "asc" | "desc") => {
    setSortOrder(order);
    const sortedPosts = sortPosts(filteredPosts, order);
    setFilteredPosts(sortedPosts);
    setCurrentPage(1); // reset to the first page
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="...">
      <div className="...">
        <FilterAndSort
          filterPostsByTags={filterPostsByTags}
          sortPostsByDate={sortPostsByDate}
        />
      </div>
      <div className="flex flex-col gap-4 my-12 sm:my-16 md:my-20 lg:my-28 mx-auto p-0 sm:p-2 md:p-8 box-border rounded-lg bg-soft-mint shadow-2xl w-full max-w-md md:max-w-xl lg:max-w-4xl">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
  
        {currentPosts.length === 0 ? (
          <div className='text-center p-4'>
            <h2 className="text-base md:text-lg lg:text-2xl mb-8">No Posts to display</h2>
            {/* <p className="text-sm md:text-base lg:text-lg">Please wait for the server to wake up</p> */}
          </div>
        ) : (
          [...currentPosts].map((post) => (
            <PostComponent
              key={post.id}
              post={post}
              handleDelete={handleDelete}
            />
          ))
        )}
  
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
}

export default IndexPage;
