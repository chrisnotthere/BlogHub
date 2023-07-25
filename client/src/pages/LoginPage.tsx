import { useContext, useState } from "react";
import '../assets/styles/login-register.css'
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

function LoginPage() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [redirect, setRedirect] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { setUserInfo } = useContext(UserContext);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // send username and password to server
    const loginUser = async () => {
      try {
        const response = await fetch("http://localhost:5000/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
          credentials: 'include',  // include cookies with the request
        });

        if (response.ok) {
          console.log("user logged in successfully");
          setUserInfo({ username, isLoggedIn: true });
          setRedirect(true);
        } else {
          const err = await response.json();
          console.log(err)
          setError(err.message);
        }
      } catch (error) {
        console.error('Network error:', error);
        setError('Network error. Please try again later.');
      }
    }
    loginUser();
  };

  if (redirect)  return <Navigate to="/" />;

  return (
    <div className="form-container">
      <h1>LOG IN</h1>
      <form className="auth-form" onSubmit={handleSubmit}>
        <input
          type="text"
          id="username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          minLength={3}
        />
        <input
          type="password"
          id="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength={6}
        />
        <button type="submit">Login</button>
        <div className="register">
          <span>Don't have an account?</span>
          <Link to={'/register'} >Register</Link>
        </div>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default LoginPage;
