import React, { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Editor from "./components/Editor";
import '../assets/styles/create-post.css'
import { UserContext } from "../context/UserContext";

function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [redirect, setRedirect] = useState(false);

  const { userInfo } = useContext(UserContext);

  async function createNewPost(e: { preventDefault: () => void }) {
    e.preventDefault();
    let data = JSON.stringify({
      title: title,
      content: content,
      author: userInfo.username
    });
    console.log(data)

    const response = await fetch("http://localhost:5000/posts/createPost", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
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
