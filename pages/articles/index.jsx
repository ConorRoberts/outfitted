import React from "react";
import Header from "@components/Header";
import styles from "@styles/Articles.module.scss";
import ArticlePreview from "@components/ArticlePreview";
import Loading from "@components/Loading";
import useArticlePreviews from "@utils/useArticlePreviews";

const Newsletter = () => {
  const articles = useArticlePreviews();

  if (!articles) return <Loading />;

  return (
    <div>
      <Header title="Articles" />
      <main className={styles.main}>
        <h1>Articles</h1>
        <div className={styles.container}>
          <div className={styles.articleListContainer}>
            {articles?.map((article) => (
              <div key={article._id} className={styles.article}>
                <ArticlePreview compact article={article} />
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Newsletter;
