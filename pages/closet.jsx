import React from "react";
import Header from "../components/Header";
import { useSession } from "next-auth/client";
import styles from "../styles/Closet.module.scss";
import { useRouter } from "next/router";
import { gql, useQuery } from "@apollo/client";
import Item from "@components/Item";
import Footer from "@components/Footer";

const GET_ITEMS = gql`
  query GetItems($id: String!) {
    settings(id: $id) {
      recommendations {
        _id
        name
        description
        images
      }
      likes {
        _id
        name
        description
        images
      }
    }
  }
`;

const Closet = () => {
  const [session, loadingSession] = useSession();
  const router = useRouter();
  const { data } = useQuery(GET_ITEMS, {
    variables: { id: session?.user.id ?? "" },
  });

  if (!loadingSession && !session) {
    router.push("/");
  }

  return (
    <div>
      <Header title="Closet" />
      <main className={styles.main}>
        <h2 className={styles.title}>We think you'll like these</h2>
        <div className={styles.itemListContainer}>
          <div className={styles.itemList}>
            <h2>Likes</h2>
            {data &&
              data.settings.likes.map((item) => (
                <Item key={item._id} item={item} />
              ))}
          </div>
          <div className={styles.itemList}>
            <h2>Recommendations</h2>
            {data &&
              data.settings.recommendations.map((item) => (
                <Item key={item._id} item={item} />
              ))}
          </div>
        </div>
      </main>
      <Footer/>
    </div>
  );
};

export default Closet;
