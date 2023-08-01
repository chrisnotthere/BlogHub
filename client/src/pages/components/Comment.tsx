import ReactQuill from "react-quill";
import styles from "../../assets/styles/comment.module.css";

interface CommentComponentProps {
  id: string | undefined;
  userInfo: any;
}

export default function CommentComponent({
  id,
  userInfo,
}: CommentComponentProps) {
  const modules = {
    toolbar: [["bold", "italic", "underline", "strike"], ["clean"]],
  };

  async function createComment(e: { preventDefault: () => void }) {
    e.preventDefault();
    console.log("comment created");
  }

  return (
    <div className={styles.createCommentContainer}>
      <form className={styles.commentForm} onSubmit={createComment}>
        <h3>Post a comment</h3>
        <div className={styles.editorContainer}>
          <ReactQuill
            className={styles.commentEditor}
            // value={value}
            theme={"snow"}
            // onChange={onChange}
            modules={modules}
          />
        </div>
        <button type="submit">Comment</button>
      </form>
    </div>
  );
}
