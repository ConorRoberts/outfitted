import React, { useState, useEffect } from "react";
import Article from "../../components/Article";
import { useRouter } from "next/router";
import { gql, useQuery } from "@apollo/client";
import Header from "../../components/Header";
import Head from "next/head";
import styles from "../../styles/ArticlePage.module.scss";

const GET_ARTICLE = gql`
  query GetArticle($id: String!) {
    article(id: $id) {
      title
      body
      image
      timestamp
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
  const { loading, error, data } = useQuery(GET_ARTICLE, {
    variables: { id: "" + id },
  });

  //   Want to give the article some default values so we can display before the query resolves
  const [article, setArticle] = useState({
    title: "Article",
    body: "",
    image: "",
    sections: [],
  });

  useEffect(() => {
    if (data) {
      setArticle(data.article);
    }
  }, [data]);

  return (
    <div>
      <Head>
        <title>{article.title}</title>
      </Head>
      <Header />
      <div className={styles.main}>

      <Article article={article} />
      </div>
    </div>
  );
};

export default ArticlePage;
