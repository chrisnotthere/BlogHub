import { useState } from "react";
import '../assets/styles/login-register.css'
import { Link } from "react-router-dom";

function LoginPage() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [redirect, setRedirect] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("login form submitted");
    console.log({ username, password });
    
  };

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
    </div>
  );
}

export default LoginPage;
