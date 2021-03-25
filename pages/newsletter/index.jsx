import React from "react";
import Header from "../../components/Header";
import styles from "../../styles/Newsletter.module.scss";
import Head from "next/head";
import ArticlePreview from "@components/ArticlePreview";
import Loading from "@components/Loading";
import useArticlePreviews from "@utils/useArticlePreviews";

const Newsletter = () => {
  const articles = useArticlePreviews();

  if (!articles) return <Loading />;

  return (
    <div>
      <Head>
        <title>Newsletter</title>
        <link rel="icon" type="image/png" href="/logo.jpg" />
      </Head>
      <Header />
      <main className={styles.main}>
        <h1>Newsletter</h1>
        <div className={styles.container}>
          <div className={styles.articleListContainer}>
            {articles?.map((article) => (
              <div key={article._id} className={styles.article}>
                <ArticlePreview article={article} />
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Newsletter;
