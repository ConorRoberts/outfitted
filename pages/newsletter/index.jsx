import React from "react";
import Header from "../../components/Header";
import { gql, useQuery } from '@apollo/client';
import styles from "../../styles/Newsletter.module.scss";
import Head from "next/head";
import ArticlePreview from "../../components/ArticlePreview";

const GET_ALL_ARTICLES = gql`
    query GetAllArticles{
        articles{
            _id
            title
            body
            image
            sections{
                title
                body
                image
            }
        }
    }
`;

const Newsletter = () => {
    const { loading, error, data } = useQuery(GET_ALL_ARTICLES);

    return (
        <div>
            <Head>
                <title>Newsletter</title>
            </Head>
            <Header />
            <main className={styles.main}>
                <h1>Newsletter</h1>
                <div className={styles.container}>
                    <div className={styles.articleListContainer}>
                        {data && data.articles.map((article) =>
                            <ArticlePreview key={article._id} article={article} />)}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Newsletter;