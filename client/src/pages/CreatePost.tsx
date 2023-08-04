import { useContext, useRef, useState } from "react";
import { Navigate } from "react-router-dom";
import Editor from "./components/Editor";
import styles from "../assets/styles/create-post.module.css";
import { UserContext } from "../context/UserContext";

function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<FileList | null>(null);
  const [useDefaultImage, setUseDefaultImage] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [imageError, setImageError] = useState("");
  const [contentError, setContentError] = useState("");

  const { userInfo } = useContext(UserContext);
  const fileInputRef = useRef(null);

  const handleUseDefaultImage = () => {
    setUseDefaultImage(true);
    setImage(null); 
    setImageError("");

    // Clear file input if any
    if (fileInputRef.current) {
      (fileInputRef.current as any).value = null;
    }
  };

  async function createNewPost(e: { preventDefault: () => void }) {
    e.preventDefault();

    if (!image && !useDefaultImage) {
      setImageError(
        "You must either select an image or use the default image."
      );
      return;
    }

    if (!content.trim()) {
      setContentError("Blog content cannot be empty.");
      return;
    }

    const formData = new FormData();
    formData.set("title", title);
    formData.set("content", content);
    formData.set("author", userInfo.username);
    formData.set("user_id", userInfo.user_id);

    if (useDefaultImage) {
      formData.set("image", "images/default.webp");
    } else if (image) {
      formData.set("image", image[0]);
    }

    const response = await fetch("http://localhost:5000/posts/createPost", {
      method: "POST",
      body: formData,
      credentials: "include",
    });
    if (response.ok) {
      setRedirect(true);
    }
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className={styles.createPost}>
      <form onSubmit={createNewPost}>

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
          ref={fileInputRef}
          type="file"
          onChange={(ev) => {
            setImage(ev.target.files);
            setUseDefaultImage(false);
            setImageError("");
          }}
          id="image"
        />

        <div className={styles.defaultContainer}>
          <button type="button" onClick={handleUseDefaultImage}>
            Use Default Image
          </button>

          <p>{useDefaultImage ? "Default image selected" : ""}</p>
        </div>


        {imageError && <p className={styles.imageErrorMessage}>{imageError}</p>}

        <div className={styles.quillContainer}>
          <Editor value={content} onChange={setContent} />
        </div>

        {contentError && <p className={styles.contentErrorMessage}>{contentError}</p>}

        <button>Create post</button>
      </form>
    </div>
  );
}

export default CreatePost;
