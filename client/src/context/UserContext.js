import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export function UserContextProvider({ children }) {
  const [userInfo, setUserInfo] = useState({})

  // on mount, check if user is logged in
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("http://localhost:5000/auth/user", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: 'include', 
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setUserInfo({ username: data.username, isLoggedIn: true });
      } catch (error) {
        setUserInfo({ username: "", isLoggedIn: false });
      }
    };

    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{userInfo, setUserInfo}}>
      {children}
    </UserContext.Provider>
  );
}
