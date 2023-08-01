import React, { useContext, useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import Editor from "./components/Editor";
import styles from "../assets/styles/create-post.module.css";
import { UserContext } from "../context/UserContext";

function EditPost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<FileList | null>(null);
  const [redirect, setRedirect] = useState(false);

  const { id } = useParams();
  const { userInfo } = useContext(UserContext);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:5000/posts/post/${id}`);
      if (response.ok) {
        const responseJson = await response.json();
        const data = responseJson.data;
        setTitle(data.title || "");
        setContent(data.content || "");
      }
    };

    fetchData();
  }, [id]);

  async function updatePost(e: { preventDefault: () => void }) {
    e.preventDefault();
    const formData = new FormData();
    formData.set("title", title);
    formData.set("content", content);
    formData.set("author", userInfo.username);

    if (image) {
      formData.set("image", image[0]);
    }

    const response = await fetch(
      `http://localhost:5000/posts/updatePost/${id}`,
      {
        method: "PUT",
        body: formData,
        credentials: "include",
      }
    );
    if (response.ok) {
      setRedirect(true);
    }
  }

  if (redirect) {
    return <Navigate to={`/post/${id}`} />;
  }

  return (
    <div className={styles.createPost}>
      <form onSubmit={updatePost}>
        <label htmlFor="title">Title</label>
        <input
          type="title"
          placeholder={"Title"}
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <label htmlFor="image">Cover Image</label>
        <input
          type="file"
          onChange={(ev) => setImage(ev.target.files)}
          id="image"
        />
        <div className={styles.quillContainer}>
          <Editor value={content} onChange={setContent} />
        </div>
        <button>Update post</button>
      </form>
    </div>
  );
}

export default EditPost;
