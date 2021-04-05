import React from "react";
import Link from "next/link";
import styles from "@styles/ArticlePreview.module.scss";

const ArticlePreview = ({ article }) => {
  const { title, image, timestamp, body, author, _id } = article;

  return (
    <Link href={`/articles/${_id}`}>
        <div className={styles.article}>
          <img src={`${image ?? "https://via.placeholder.com/500"}`} />
          <div className={styles.textContainer}>
            <h4>{title}</h4>
            {author && (
              <p>
                Published by {author} on
                <span> {new Date(timestamp).toLocaleDateString()}</span>
              </p>
            )}
            <p className={styles.description}>{body.substring(0,200) + " ..."}</p>
          </div>
        </div>
    
    </Link>
  );
};

export default ArticlePreview;
