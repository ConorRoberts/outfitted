import React from "react";
import { AiOutlineLoading } from "react-icons/ai";
import styles from "../styles/Loading.module.scss";
import Link from "next/link";
import { FaHome } from "react-icons/fa";

const Loading = () => {
  return (
    <div className={styles.container}>
      <div className={styles.loading}>
        <AiOutlineLoading />
      </div>
      <Link href="/">
        <a className={styles.icon}>
          <FaHome />
        </a>
      </Link>
    </div>
  );
};

export default Loading;
