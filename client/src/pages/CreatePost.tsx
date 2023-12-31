import { useContext, useRef, useState } from "react";
import { Navigate } from "react-router-dom";
import Editor from "./components/Editor";
import styles from "../assets/styles/create-edit-post.module.css";
import { UserContext } from "../context/UserContext";
import { TAGS } from "../types/Post";
import ReactSelect from "react-select";

function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<FileList | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [labelText, setLabelText] = useState("No file chosen");
  const [tags, setTags] = useState<string[]>([]);
  const [useDefaultImage, setUseDefaultImage] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [imageError, setImageError] = useState("");
  const [contentError, setContentError] = useState("");
  const [postError, setPostError] = useState("");

  const { userInfo } = useContext(UserContext);

  const options = TAGS.map((tag) => ({
    label: tag,
    value: tag,
  })) as { label: string; value: string }[];

  const customStyles = {
    option: (provided: any, state: any) => ({
      ...provided,
      fontSize: ".8rem",
    }),
    singleValue: (provided: any, state: any) => ({
      ...provided,
      fontSize: ".8rem",
    }),
  };

  const handleUseDefaultImage = () => {
    setUseDefaultImage(true);
    setImage(null);
    setImageError("");
    setLabelText("No file chosen");

    // Clear file input if any
    if (fileInputRef.current) {
      (fileInputRef.current as any).value = null;
    }
  };

  const handleUpdateText = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const files = ev.target.files;
    if (files) {
      setImage(files);
      setLabelText(`${files.length} file chosen`);
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
    formData.set("tags", tags.join(","));

    if (useDefaultImage) {
      formData.set("image", "images/default.webp");
    } else if (image) {
      formData.set("image", image[0]);
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_HEROKU_URL}posts/createPost`,
        {
          method: "POST",
          body: formData,
          credentials: "include",
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        setPostError(
          errorData.message || "Something went wrong while creating the post."
        );
      } else {
        setRedirect(true);
      }
    } catch (error) {
      console.error(error);
      setPostError("An unexpected error occurred. Please try again later.");
    }
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className={styles.createPost}>
      <div className={styles.formContainer}>
        <form className={styles.postForm} onSubmit={createNewPost}>
          <label htmlFor="title">Title</label>
          <input
            type="title"
            placeholder={"Title"}
            id="title"
            className={styles.titleInput}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <label htmlFor="image">Cover Image</label>
          <div className={styles.imageSelect}>
            <div className="custom-file-upload">
              <button
                type="button"
                onClick={() => {
                  if (fileInputRef.current !== null) {
                    fileInputRef.current.click();
                  }
                }}
              >
                Upload File
              </button>
              <span>{labelText}</span>
              <input
                ref={fileInputRef}
                type="file"
                style={{ display: "none" }}
                onChange={(ev) => {
                  setImage(ev.target.files);
                  setUseDefaultImage(false);
                  setImageError("");
                  handleUpdateText(ev);
                }}
                id="image"
              />
            </div>

            <div className={styles.defaultContainer}>
              <button type="button" onClick={handleUseDefaultImage}>
                Use Default Image
              </button>

              <p>{useDefaultImage ? "Default image selected" : ""}</p>
            </div>

            {imageError && (
              <p className={styles.imageErrorMessage}>{imageError}</p>
            )}

          </div>

          <div className={styles.tagsContainer}>
            <label htmlFor="tags">Tags</label>
            <ReactSelect
              id="tags"
              name="tags"
              isMulti
              options={options}
              styles={customStyles}
              onChange={(selectedOptions) => {
                const selectedTags = selectedOptions.map(
                  (option) => option.value
                );
                setTags(selectedTags);
              }}
            />
          </div>

          <div className={styles.quillContainer}>
            <Editor value={content} onChange={setContent} />
          </div>

          {contentError && (
            <p className={styles.contentErrorMessage}>{contentError}</p>
          )}

          {postError && <p className={styles.postErrorMessage}>{postError}</p>}

          <button>Create post</button>
        </form>
      </div>
    </div>
  );
}

export default CreatePost;
