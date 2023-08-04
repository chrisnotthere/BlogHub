import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import Editor from "./components/Editor";
import styles from "../assets/styles/create-post.module.css";
import { UserContext } from "../context/UserContext";

function EditPost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<FileList | null>(null);
  const [existingImage, setExistingImage] = useState<string | null>(null);
  const [useDefaultImage, setUseDefaultImage] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [contentError, setContentError] = useState("");

  const { id } = useParams();
  const { userInfo } = useContext(UserContext);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:5000/posts/post/${id}`);
      if (response.ok) {
        const responseJson = await response.json();
        const data = responseJson.data;
        console.log(data)

        setTitle(data.title || "");
        setContent(data.content || "");
        setExistingImage(data.image || null); 

      }
    };

    fetchData();
  }, [id]);

  const handleUseDefaultImage = () => {
    setUseDefaultImage(true);
    setImage(null);

    if (fileInputRef.current) {
      (fileInputRef.current as any).value = null;
    }
  };

  async function updatePost(e: { preventDefault: () => void }) {
    e.preventDefault();

    if (!content.trim()) {
      setContentError("Blog content cannot be empty.");
      return;
    }

    const formData = new FormData();
    formData.set("title", title);
    formData.set("content", content);
    formData.set("author", userInfo.username);

    if (useDefaultImage) {
      formData.set("image", "images/default.webp");
    } else if (image) {
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

        <p className={styles.currentImage}>Current Cover Image: {existingImage || 'Default Image'}</p>
        
        <input
          ref={fileInputRef}
          type="file"
          onChange={(ev) => {
            setImage(ev.target.files);
            setUseDefaultImage(false);
          }}
          id="image"
        />

        <div className={styles.defaultContainer}>
          <button type="button" onClick={handleUseDefaultImage}>
            Use Default Image
          </button>
          <p>{useDefaultImage ? "Default image selected" : ""}</p>
        </div>

        <div className={styles.quillContainer}>
          <Editor value={content} onChange={setContent} />
        </div>

        {contentError && <p className={styles.contentErrorMessage}>{contentError}</p>}

        <button>Update post</button>
      </form>
    </div>
  );
}

export default EditPost;
