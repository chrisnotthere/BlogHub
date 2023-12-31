import { Link } from "react-router-dom";
import styles from "../../assets/styles/header.module.css";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

export default function Header() {
  const { userInfo, setUserInfo } = useContext(UserContext);

  const handleLogout = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_HEROKU_URL}auth/logout`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );
      setUserInfo({ username: "", isLoggedIn: false });
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  return (
    <header className={styles.header}>
      <Link className={styles.logo} to="/">
        <span className={styles.logo1}>Blog</span>
        <div className={styles.logo2}>Hub</div>
      </Link>
      <nav className={styles.nav}>
        <ul className={styles.navTop}>
          <li>
            <Link
              to={userInfo.isLoggedIn ? "/create-post" : "#"}
              className={userInfo.isLoggedIn ? "" : styles.inactiveLink}
              onClick={(e) => {
                if (
                  userInfo.isLoggedIn &&
                  !(userInfo.role === "admin" || userInfo.role === "writer")
                ) {
                  e.preventDefault();
                  alert("You must be an admin or writer to create a post.");
                }
              }}
            >
              Create Post
            </Link>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className={`${styles.linkButton} ${
                userInfo.isLoggedIn ? "" : styles.inactiveLink
              }`}
            >
              Logout
            </button>
          </li>
        </ul>
        <ul className={styles.navBottom}>
          {userInfo.isLoggedIn ? (
            <>
              <li className={styles.username}>
                logged in as {userInfo.username} ({userInfo.role})
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" className={styles.prominentLink}>
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className={styles.prominentLink}>
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
