import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/styles/styles.css";
import App from "./pages/App";
import { BrowserRouter } from "react-router-dom";
import { UserContextProvider } from "./context/UserContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <UserContextProvider>
      <BrowserRouter basename='/BlogHub'>
          <App />
      </BrowserRouter>
    </UserContextProvider>
  </React.StrictMode>
);
