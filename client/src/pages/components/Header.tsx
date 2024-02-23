import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";

// import LogoTransparent from "../../assets/images/bloghub-logo-transparent.png";
import LogoText from "../../assets/images/bloghub-logo-text.png";

export default function Header() {
  const { userInfo, setUserInfo } = useContext(UserContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);


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

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 w-full flex justify-between items-center bg-mint-green shadow-md z-50">
      <nav className="size-full flex justify-between items-center p-0 md:py-1 md:px-10">

        {/* Logo - Left */}
        <div className="flex justify-center items-center">
          <Link
            className="p-1 rounded-full bg-transparent transition duration-300 ease-in-out hover:bg-spring-green/50"
            to="/"
          >
            <img
              src={LogoText}
              alt="BlogHub Logo"
              className="p-1 h-8 sm:h-12"
            />
          </Link>

        </div>

        {/* Nav Menu */}
        <div className="hidden sm:flex">
          <ul className="flex gap-2 justify-center items-center">
            <li>
              <Link to="/" className="inline-block text-lg py-3 px-4 text-gray-900 rounded-lg transition duration-300 ease-in-out hover:text-white hover:bg-spring-green/50 text-sm md:text-lg md:border-0">
                Home
              </Link>
            </li>

            {userInfo.isLoggedIn ? (
              <>
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
        </div>

        {/* Hamburger Icon */}
        <div className="sm:hidden">
          <button className="p-2 sm:hidden" onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg viewBox="0 0 100 80" width="20" height="20">
                <rect width="100" height="10"></rect>
                <rect y="30" width="100" height="10"></rect>
                <rect y="60" width="100" height="10"></rect>
              </svg>
            )}
          </button>

        </div>

        {/* Mobile Menu */}
        <div className={`${isMobileMenuOpen ? "block" : "hidden"} absolute top-10 md:top-14 w-full bg-slate-900 transition-all ease-out duration-300 z-10 sm:hidden`}>
          <ul className="flex flex-col gap-2 my-1 justify-center items-center">
            <li>
              <Link onClick={closeMenu} to="/" className="inline-block text-lg py-3 px-4 text-white rounded-lg transition duration-300 ease-in-out hover:text-white hover:bg-spring-green/50 text-sm md:text-lg md:border-0">
                Home
              </Link>
            </li>

            {userInfo.isLoggedIn ? (
              <>
                <li>
                  <Link
                    to={userInfo.isLoggedIn ? "/create-post" : "#"}
                    className={userInfo.isLoggedIn ? "inline-block text-lg py-3 px-4 text-white rounded-lg transition duration-300 ease-in-out hover:text-white hover:bg-spring-green/50 text-sm md:text-lg md:border-0" : "hidden"}
                    onClick={(e) => {
                      closeMenu();
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
                    onClick={()=>{
                      handleLogout();
                      closeMenu();
                    }}
                    className={`${userInfo.isLoggedIn ? "inline-block text-lg py-3 px-4 text-white rounded-lg transition duration-300 ease-in-out hover:text-white hover:bg-spring-green/50 text-sm md:text-lg md:border-0" : "hidden"}`}
                  >
                    Logout
                  </button>
                </li>
              </>
              ) : (
              <div className="flex-col gap-2 justify-center items-center">
                <li className="text-center mb-2">
                  <Link onClick={closeMenu} to="/login" className="inline-block text-lg py-3 px-4 text-white rounded-lg transition duration-300 ease-in-out hover:text-white hover:bg-spring-green/50 text-sm md:text-lg md:border-0">
                    Login
                  </Link>
                </li>
                <li className="text-center">
                  <Link onClick={closeMenu} to="/register" className="inline-block text-lg py-3 px-4 text-white rounded-lg transition duration-300 ease-in-out hover:text-white hover:bg-spring-green/50 text-sm md:text-lg md:border-0">
                    Register
                  </Link>
                </li>
              </div>
            )}
          </ul>
        </div>

      </nav>
    </header>
  );
}
