import React from "react";
import styles from "./Header.module.css";
import Link from "next/link";
const Header = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link className={styles.logo} href="/">
          Todo-App
        </Link>
        <Link className={styles.link} href="/add-todo">
          Add Todo
        </Link>
      </header>
    </div>
  );
};

export default Header;
