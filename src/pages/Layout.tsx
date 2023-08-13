import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import styles from "../assets/styles/layout.module.css";

export default function Layout() {
  return (
    <main className={styles.layout}>
      <Header />
      <div className={styles.mainContent}>
        <Outlet />
      </div>
    </main>
  );
}
