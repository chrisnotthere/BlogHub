import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export function UserContextProvider({ children }) {
  const [userInfo, setUserInfo] = useState({});

  // on mount, check if user is logged in
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_HEROKU_URL}auth/user`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          }
        );

        if (response.status === 401 || response.status === 403) {
          // If the response status is 401 or 403, assume the user is not logged in
          throw new Error("User not authenticated");
        }

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();

        setUserInfo({
          username: data.username,
          user_id: data.user_id,
          role: data.role,
          isLoggedIn: true,
        });
      } catch (error) {
        setUserInfo({ username: "", role: "", isLoggedIn: false });
      }
    };

    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserContext.Provider>
  );
}
