import React from "react";
import styles from "../styles/Article.module.scss";

const Article = ({article}) => {
    const { title, body, sections } = article;
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.body}>{body}</p>
      {sections &&
        sections.map((section, index) => (
          <div
            className={styles.sectionContainer}
            key={`${section.title}${index}`}
          >
            <h2 className={styles.sectionTitle}>{section.title}</h2>
            <div className={styles.sectionContent}>
              <img
                className={styles.sectionImage}
                src={section.image}
                alt={section.title}
              />
              <p className={styles.sectionBody}>{section.body}</p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Article;
