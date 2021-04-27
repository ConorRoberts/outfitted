import React from "react";
import Header from "@components/Header";
import styles from "@styles/Articles.module.scss";
import ArticlePreview from "@components/ArticlePreview";
import Loading from "@components/Loading";
import useArticlePreviews from "@utils/useArticlePreviews";
import styled from "styled-components";
import { theme } from "../../globalStyles";

const Newsletter = () => {
  const articles = useArticlePreviews();

  if (!articles) return <Loading />;

  return (
    <div>
      <Header title="Articles" />
      <main className={styles.main}>
        <Title>Articles</Title>
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

const Title = styled.h1`
  font-size: 2.5rem;
  text-align: center;
  color: ${theme.accentMain};
  font-weight: 400;
  margin-bottom: 1rem;
`;

export default Newsletter;
