import ReactQuill from "react-quill";
import { useState } from "react";

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
    <div className="w-full">
      <form className="flex flex-col h-80" onSubmit={createComment}>
        <h3 className="text-deep-sea text-center text-xl mt-4">Post a comment</h3>
        <div className="my-4 max-w-full">
          <ReactQuill
            className="w-full h-40 p-2 bg-white rounded-md"
            value={commentValue}
            theme="snow"
            onChange={onEditorChange}
            modules={modules}
          />
        </div>
        <button type="submit" className="w-24 h-10 mt-10 bg-white text-bright-teal rounded border-2 border-bright-teal font-semibold hover:bg-bright-teal hover:text-white transition-colors duration-300 ease-in-out mx-auto">
          Comment
        </button>
      </form>
    </div>
  );
}
