import React from "react";
import Article from "@components/Article";
import { useRouter } from "next/router";
import { gql, useQuery } from "@apollo/client";
import Header from "@components/Header";
import Head from "next/head";
import styles from "@styles/ArticlePage.module.scss";

const GET_ARTICLE = gql`
  query GetArticle($id: String!) {
    article(id: $id) {
      title
      body
      image
      author
      timestamp
      featuredItems {
        _id
        name
        images
        description
        link
      }
      sections {
        title
        body
        image
      }
    }
  }
`;

const ArticlePage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data } = useQuery(GET_ARTICLE, {
    variables: { id: "" + id },
  });

  return (
    <div>
      <Header title={data?.article.title} />
      <div className={styles.main}>
        <Article article={data?.article} />
      </div>
    </div>
  );
};

export default ArticlePage;
