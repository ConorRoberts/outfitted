import React from "react";
import Link from "next/link";
import styles from "../styles/ArticlePreview.module.scss";

const ArticlePreview = ({ article }) => {
    const { title, image } = article;
    return (
        <Link href={`/newsletter/${article._id}`}>
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

export default ArticlePreview;