import React, { useContext, useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import Editor from "./components/Editor";
import '../assets/styles/create-post.css'
import { UserContext } from "../context/UserContext";

function EditPost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [redirect, setRedirect] = useState(false);

  const { id } = useParams();
  const { userInfo } = useContext(UserContext);

  useEffect(() => {
    console.log('fetching data')
    const fetchData = async () => {
      const response = await fetch(`http://localhost:5000/posts/post/${id}`);
      if (response.ok) {
        // const data = await response.json();
        const responseJson = await response.json();
        const data = responseJson.data;
        console.log(data)
        setTitle(data.title || "");
        setContent(data.content || "");
      }
    };

    fetchData();
  }, [id]);

  async function updatePost(e: { preventDefault: () => void; }) {
    e.preventDefault();
    let data = JSON.stringify({
      title: title,
      content: content,
      author: userInfo.username,
      id: id
    });

    const response = await fetch(`http://localhost:5000/posts/updatePost/${id}`, {
      method: "PUT",
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
      <form onSubmit={updatePost}>
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
        <button>Update post</button>
      </form>
    </div>
  );
}

export default EditPost;
