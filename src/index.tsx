import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/styles/index.css";
import App from "./pages/App";
import { BrowserRouter, HashRouter } from "react-router-dom";
import { UserContextProvider } from "./context/UserContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
console.log("process.env.REACT_APP_PUBLIC_URL");
console.log(process.env.REACT_APP_PUBLIC_URL);
root.render(
  <React.StrictMode>
    <UserContextProvider>
      {/* <BrowserRouter basename={process.env.REACT_APP_PUBLIC_URL}> */}
      <BrowserRouter basename='/BlogHub'>
        {/* <HashRouter basename={process.env.REACT_APP_PUBLIC_URL}> */}
          <App />
        {/* </HashRouter> */}
      </BrowserRouter>
    </UserContextProvider>
  </React.StrictMode>
);
