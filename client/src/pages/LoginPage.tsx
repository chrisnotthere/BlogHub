import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

function LoginPage() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [redirect, setRedirect] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { setUserInfo } = useContext(UserContext);

  const guestUsername = process.env.REACT_APP_GUEST_USERNAME as string;
  const guestPassword = process.env.REACT_APP_GUEST_PASSWORD as string;
  const guestAdminUsername = process.env
    .REACT_APP_GUEST_ADMIN_USERNAME as string;
  const guestAdminPassword = process.env
    .REACT_APP_GUEST_ADMIN_PASSWORD as string;

  const handleSubmit = async (username: string, password: string) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_HEROKU_URL}auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
        credentials: "include",
      });

      if (response.ok) {
        const { user } = await response.json();
        setUserInfo({ ...user, isLoggedIn: true });
        setRedirect(true);
      } else {
        const err = await response.json();
        setError(err.message);
      }
    } catch (error) {
      setError("Network error. Please try again later.");
    }
  };

  const loginAsGuest = () => {
    handleSubmit(guestUsername, guestPassword);
  };

  const loginAsAdmin = () => {
    handleSubmit(guestAdminUsername, guestAdminPassword);
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit(username, password);
  };

  if (redirect) return <Navigate to="/" />;

  return (
    <div className="flex flex-col text-center mt-20">
      {/* Top */}
      <div className="flex flex-col items-center justify-center bg-mint-green max-w-xs rounded-lg my-4 mx-auto py-2 px-0 shadow-2xl sm:max-w-lg md:max-w-xl sm:p-8 md:p-12">
        <h1 className="text-xl md:text-3xl">LOGIN</h1>
        <form className="flex flex-col items-center w-full p-4" onSubmit={handleFormSubmit}>
          <label className="hidden" htmlFor="username">Username</label>
          <input
            className="my-2 h-8 rounded border-none p-2"
            type="text"
            id="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            minLength={3}
            required
          />
          <label className="hidden" htmlFor="password">Password</label>
          <input
            className="my-2 h-8 rounded-md border-none p-2"
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={6}
            required
          />
          <button className="mt-2 h-8 w-full text-lg rounded border-none cursor-pointer transition duration-300 ease-in-out bg-spring-green hover:bg-spring-green/60 hover:text-light-turquoise" 
            type="submit">
            Login
          </button>
          <div className="flex flex-col gap-2 text-sm mt-4 text-center">
            <span>Don't have an account?</span>
            <Link className="text-deep-sea font-semibold hover:text-teal3 hover:underline" to={"/register"}>Register</Link>
          </div>
        </form>
        {error && <p className="">{error}</p>}
      </div>
      {/* Bottom */}
      <div className="flex flex-col bg-mint-green rounded-lg my-8 mx-auto p-5 shadow-2xl w-60 ">
        <button className="flex items-center justify-center mt-2 h-8 p-4 w-full text-lg rounded border-none cursor-pointer transition duration-300 ease-in-out bg-spring-green hover:bg-spring-green/60 hover:text-light-turquoise" onClick={loginAsGuest} aria-label="Sign in as Guest">
          Sign in as Guest
        </button>
        <button className="flex items-center justify-center mt-2 h-8 p-4 w-full text-lg rounded border-none cursor-pointer transition duration-300 ease-in-out bg-spring-green hover:bg-spring-green/60 hover:text-light-turquoise" onClick={loginAsAdmin} aria-label="Sign in as Admin">
          Sign in as Admin
        </button>
      </div>
    </div>
  );

}

export default LoginPage;
