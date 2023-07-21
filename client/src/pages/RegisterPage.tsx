import { useState } from "react";
import '../assets/styles/login-register.css'
import { Navigate } from "react-router-dom";

function RegisterPage() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [redirect, setRedirect] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("register form submitted");
    console.log({ username, password });
    // send username and password to server
    const registerUser = async () => {
      try {
        const response = await fetch("http://localhost:5000/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        });

        if (response.ok) {
          console.log("user registered successfully");
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
    registerUser();
  };

  if (redirect)  return <Navigate to="/login" />;

  return (
    <div className="form-container">
      <h1>REGISTER</h1>
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
        <button type="submit">Register</button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default RegisterPage;
