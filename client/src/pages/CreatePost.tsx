import React, { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import Editor from "./components/Editor";
import "../assets/styles/create-post.css";
import { UserContext } from "../context/UserContext";

function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<FileList | null>(null);
  const [redirect, setRedirect] = useState(false);

  const { userInfo } = useContext(UserContext);

  async function createNewPost(e: { preventDefault: () => void }) {
    e.preventDefault();
    const formData = new FormData();
    formData.set("title", title);
    formData.set("content", content);
    formData.set("author", userInfo.username);

    if (image) {
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
    <div className="create-post">
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
          type="file"
          onChange={(ev) => setImage(ev.target.files)}
          id="image"
        />
        <div className="quill-container">
          <Editor value={content} onChange={setContent} />
        </div>
        <button>Create post</button>
      </form>
    </div>
  );
}

export default CreatePost;
