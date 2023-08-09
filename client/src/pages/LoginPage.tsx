import { useContext, useState } from "react";
import "../assets/styles/login-register.css";
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
      const response = await fetch("http://localhost:5000/auth/login", {
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
    <div className="login-container">
      <div className="form-container">
        <h1>LOG IN</h1>
        <form className="auth-form" onSubmit={handleFormSubmit}>
          <label className="hidden" htmlFor="username">Username</label>
          <input
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
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={6}
            required
          />
          <button type="submit">Login</button>
          <div className="register">
            <span>Don't have an account?</span>
            <Link to={"/register"}>Register</Link>
          </div>
        </form>
        {error && <p className="error">{error}</p>}
      </div>
      <div className="guest-login">
        <button onClick={loginAsGuest} aria-label="Sign in as Guest">
          Sign in as Guest
        </button>
        <button onClick={loginAsAdmin} aria-label="Sign in as Admin">
          Sign in as Admin
        </button>
      </div>
    </div>
  );
}

export default LoginPage;
