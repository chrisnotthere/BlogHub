import { Link } from "react-router-dom";
// import styles from "../../assets/styles/header.module.css";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import LogoTransparent from "../../assets/images/bloghub-logo-transparent.png";

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
    <header className="fixed top-0 left-0 w-full flex justify-between items-center bg-mint-green shadow-md z-50">
      <nav className="size-full flex justify-between items-center p-1 md:py-2 md:px-10">

        {/* Left */}
        <div className="flex justify-center items-center gap-2">
          <Link
            className="p-1 rounded-full bg-transparent transition duration-300 ease-in-out hover:bg-spring-green/50"
            to="/"
          >
            <img
              src={LogoTransparent}
              alt="BlogHub Logo"
              className="p-1 w-12 h-12 sm:w-16 sm:h-16"
            />
          </Link>

        </div>

        {/* Right */}
        <div>
          <ul className="flex gap-2 justify-center items-center">
            <li>
              <Link to="/" className="inline-block text-lg py-3 px-4 text-gray-900 rounded-lg transition duration-300 ease-in-out hover:text-white hover:bg-spring-green/50 text-sm md:text-lg md:border-0">
                Home
              </Link>
            </li>

            {userInfo.isLoggedIn ? (
              <>
                {/* <li className=''>
                  logged in as {userInfo.username} ({userInfo.role})
                </li> */}
                <li>
                  <Link
                    to={userInfo.isLoggedIn ? "/create-post" : "#"}
                    className={userInfo.isLoggedIn ? "inline-block text-lg py-3 px-4 text-gray-900 rounded-lg transition duration-300 ease-in-out hover:text-white hover:bg-spring-green/50 text-sm md:text-lg md:border-0" : "hidden"}
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
                    className={`${userInfo.isLoggedIn ? "inline-block text-lg py-3 px-4 text-gray-900 rounded-lg transition duration-300 ease-in-out hover:text-white hover:bg-spring-green/50 text-sm md:text-lg md:border-0" : "hidden"}`}
                  >
                    Logout
                  </button>
                </li>
              </>
              ) : (
              <div className="flex gap-2">
                <li>
                  <Link to="/login" className="inline-block text-lg py-3 px-4 text-gray-900 rounded-lg transition duration-300 ease-in-out hover:text-white hover:bg-spring-green/50 text-sm md:text-lg md:border-0">
                    Login
                  </Link>
                </li>
                <li>
                  <Link to="/register" className="inline-block text-lg py-3 px-4 text-gray-900 rounded-lg transition duration-300 ease-in-out hover:text-white hover:bg-spring-green/50 text-sm md:text-lg md:border-0">
                    Register
                  </Link>
                </li>
              </div>
            )}




          </ul>



          {/* <ul className={styles.navTop}>
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
          </ul> */}

        </div>
      </nav>
    </header>
  );
}
