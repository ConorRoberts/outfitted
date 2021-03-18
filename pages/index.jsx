import Head from "next/head";
import styles from "../styles/Home.module.scss";
import Header from "../components/Header";
import Image from "next/image";
import { useQuery } from "@apollo/client";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Outfitted</title>
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      <Header />
      <main className={styles.main}>
        <div className={styles.splashContainer}>
          <div className={styles.container}>
            <Image src="/closet-minimal.jpg" width={4416} height={2944} />
          </div>
          {/* <Image src="/cartoon-closet.jpg" width={800} height={508} /> */}
        </div>
        <div className={styles.titleContainer}>
          <h1>
            Your closet,
            <br />
            <span>our canvas</span>
          </h1>
          <p className={styles.intro}>
            Our Mission is to provide you with personalized style selections so
            they can look and feel good while saving time and money
          </p>
        </div>

        <div className={styles.splashContainer}></div>
      </main>
    </div>
  );
}
