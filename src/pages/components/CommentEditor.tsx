import ReactQuill from "react-quill";
import styles from "../../assets/styles/comment.module.css";
import { useState } from "react";
import { Comment } from "../../types/Comment";

interface CommentComponentProps {
  id: string | undefined;
  userInfo: any;
  fetchComments: () => void;
}

export default function CommentEditor({
  id,
  userInfo,
  fetchComments
}: CommentComponentProps) {

  const [commentValue, setCommentValue] = useState<string>("");
  const maxLength = 200; // max length of comment

  const modules = {
    toolbar: [["bold", "italic", "underline"], ["clean"]],
  };

  function stripHtml(html: string) {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  }

  const onEditorChange = (content: string) => {
    // Check if the new content is too long
    if (stripHtml(content).length > maxLength) {
      alert("This comment is too long! 200 characters max.");
      return;
    }

    // Otherwise, update the state
    setCommentValue(content);
  };

  async function createComment(e: { preventDefault: () => void }) {
    e.preventDefault();
    
    if (userInfo.isLoggedIn === false) {
      alert("You must be logged in to comment!");
      return;
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_HEROKU_URL}comment/create`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            post_id: id,
            user_id: userInfo.user_id,
            author: userInfo.username,
            content: commentValue,
          }),
        }
      );

      if (response.ok) {
        setCommentValue("");
        // console.log("Comment created!")
        // const data = await response.json();
        // console.log(data);
        fetchComments();
      } else {
        const err = await response.text();
        console.log(err);
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className={styles.createCommentContainer}>
      <form className={styles.commentForm} onSubmit={createComment}>
        <h3>Post a comment</h3>
        <div className={styles.editorContainer}>
          <ReactQuill
            className={styles.commentEditor}
            value={commentValue}
            theme={"snow"}
            onChange={onEditorChange}
            modules={modules}
          />
        </div>
        <button type="submit">Comment</button>
      </form>
    </div>
  );
}
