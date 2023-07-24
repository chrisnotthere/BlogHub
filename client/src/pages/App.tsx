import { Navigate, Route, Routes } from "react-router-dom";
import "../assets/styles/App.css";
import Layout from "./Layout";
import IndexPage from "./IndexPage";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import { UserContext } from "../context/UserContext";
import CreatePost from "./CreatePost";
import { useContext } from "react";
import EditPost from "./EditPost";

function App() {
  const { userInfo } = useContext(UserContext);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<IndexPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/create-post" element={userInfo.isLoggedIn ? <CreatePost /> : <Navigate to="/login" />} />
        <Route path="/edit-post" element={userInfo.isLoggedIn ? <EditPost /> : <Navigate to="/login" />} />
      </Route>
    </Routes>
  );
}

export default App;
