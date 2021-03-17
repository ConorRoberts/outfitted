import React from "react";
import Header from "../components/Header";
import { gql, useMutation, useQuery } from '@apollo/client';
import styles from "../styles/Newsletter.module.scss";
import Link from "next/link";
import Head from "next/head";

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

const ArticlePreview = ({ article }) => {
    const { title, image } = article;
    return (
        <Link href={`/article/${article._id}`}>
            <div className={styles.article}>
                <div className={styles.imageContainer}>
                    <img src={image} />
                </div>
                <div className={styles.titleContainer}>
                    <div>
                        <h4>{title}</h4>
                    </div>
                </div>
            </div>
        </Link>
    )
};

const Newsletter = () => {
    const { loading, error, data } = useQuery(GET_ALL_ARTICLES);

    return (
        <div>
            <Head>
                Newsletter
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