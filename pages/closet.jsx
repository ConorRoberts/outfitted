import React, { FunctionComponent, useEffect } from "react";
import Header from "../components/Header";
import Head from "next/head";
import { signIn, signOut, useSession } from 'next-auth/client';
import styles from "../styles/Closet.module.scss";
import { useRouter } from 'next/router';
import { gql, useMutation, useQuery } from '@apollo/client';

const GET_ALL_ITEMS = gql`
    query GetItems{
        items{
            _id
            name
            description
            price
            category
            material
            image
            brand
            occasion
        }
    }
`;

const Item = ({ image, name, description, price, brand, material, category }) => {
    return (
        <div className={styles.item}>
            <div className={styles.image}>
                <img src={image} alt={name} />
            </div>
            <div className={styles.text}>
                <h3 className={styles.itemTitle}>{name}</h3>
                <p className={styles.itemCategory}>{category}</p>
                <p className={styles.itemDesc}>{description}</p>
            </div>
        </div>
    );
}

const Closet = () => {
    const [session, loadingSession] = useSession();
    const router = useRouter();

    if (!loadingSession && !session) {
        router.push("/");
    }

    const { loading, error, data } = useQuery(GET_ALL_ITEMS);

    return (
        <div>
            <Head>
                <title>Closet</title>
                <link rel="icon" type="image/png" href="/logo.jpg"/>
            </Head>
            <Header />
            <main className={styles.main}>
                <h2 className={styles.title}>We think you'll like these</h2>
                <div className={styles.itemListContainer}>
                    <div className={styles.itemList}>
                        {data && data.items.map(({ _id, name, description, image, category, price, material, brand }) =>
                            <Item key={_id} description={description} name={name} image={image} brand={brand} price={price} category={category} material={material} />
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Closet;