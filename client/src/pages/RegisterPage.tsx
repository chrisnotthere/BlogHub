import { useState } from "react";
import "../assets/styles/login-register.css";
import { Navigate } from "react-router-dom";

// custom type for roles
type Role = "admin" | "writer" | "member";

function RegisterPage() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [role, setRole] = useState<Role>("member");
  const [redirect, setRedirect] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const roleDescriptions: { [K in Role]: string } = {
    admin:
      "Admins have all-access rights.",
    writer:
      "Writers can create/edit/delete their own posts.",
    member: "Members can rate posts and leave comments.",
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // send username, password, and role to server
    const registerUser = async () => {
      try {
        const response = await fetch("http://localhost:5000/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password, role }),
        });

        if (response.ok) {
          console.log("user registered successfully");
          setRedirect(true);
        } else {
          const err = await response.json();
          console.log(err);
          setError(err.message);
        }
      } catch (error) {
        console.error("Network error:", error);
        setError("Network error. Please try again later.");
      }
    };
    registerUser();
  };

  if (redirect) return <Navigate to="/login" />;

  return (
    <div className="form-container">
      <h1>REGISTER</h1>
      <form className="auth-form" onSubmit={handleSubmit}>
        <label className="hidden" htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          minLength={3}
        />
        <label className="hidden" htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength={6}
        />
        <div className="role-select">
          <div className="role-t">
            <label htmlFor="role">Role:</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as Role)}
            >
              <option value="admin">Admin</option>
              <option value="writer">Writer</option>
              <option value="member">Member</option>
            </select>
          </div>
          <p className="role-description">{roleDescriptions[role]}</p>
        </div>
        <button type="submit">Register</button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default RegisterPage;
