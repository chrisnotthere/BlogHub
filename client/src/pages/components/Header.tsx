import { Link } from "react-router-dom";
import styles from "../../assets/styles/header.module.css";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

export default function Header() {
  const { userInfo, setUserInfo } = useContext(UserContext);
  
  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:5000/auth/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: 'include', 
      });
      setUserInfo({ username: "", isLoggedIn: false });
    } catch (error) {
      console.error('Network error:', error);
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link to="/">BlogHub</Link>
      </div>
      <nav className={styles.nav}>
        <ul>
          { userInfo?.isLoggedIn ? (
            <>
              <li>
                <Link to="/create-post">Create Post</Link>
              </li>
              <li>
                <a href="#" onClick={handleLogout}>Logout</a>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
