import styles from "../../assets/styles/postpage.module.css";

interface CommentComponentProps {
  id: string | undefined;
  userInfo: any;
}

export default function CommentComponent({id, userInfo}: CommentComponentProps) {
  
  // console.log(userInfo)

  
  return (
    <div className={styles.createCommentContainer}>
    <p>post a comment section</p>
    <p>123</p>
  </div>
  )
}
