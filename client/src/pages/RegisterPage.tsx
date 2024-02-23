import { useState } from "react";
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
        const response = await fetch(`${process.env.REACT_APP_HEROKU_URL}auth/register`, {
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
    <div className="flex flex-col text-center">
      <div className="flex flex-col items-center justify-center bg-mint-green max-w-xs rounded-lg my-4 mx-auto py-2 px-0 shadow-2xl sm:max-w-lg md:max-w-xl sm:p-8 md:p-12">
        <h1 className="text-xl bg-mint-green md:text-3xl">REGISTER</h1>
        <form className="flex flex-col items-center w-full p-4" onSubmit={handleSubmit}>
          <label className="hidden" htmlFor="username">Username:</label>
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
          <label className="hidden" htmlFor="password">Password:</label>
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
          <div className="role-select w-full flex flex-col items-center justify-center mt-4">
            <div className="role-t flex items-center justify-around w-full px-2">
              <label className="mr-2" htmlFor="role">Role:</label>
              <select
                className="border-none rounded p-2 bg-soft-mint"
                value={role}
                onChange={(e) => setRole(e.target.value as Role)}
              >
                <option value="admin">Admin</option>
                <option value="writer">Writer</option>
                <option value="member">Member</option>
              </select>
            </div>
            <p className="role-description text-sm mt-2 max-w-60">{roleDescriptions[role]}</p>
          </div>
          <button className="mt-2 h-8 w-full text-lg rounded border-none cursor-pointer transition duration-300 ease-in-out bg-spring-green hover:bg-spring-green/60 hover:text-light-turquoise" 
            type="submit">
            Register
          </button>
        </form>
        {error && <p className=" text-red-600">{error}</p>}
      </div>
    </div>
  );
}

export default RegisterPage;
