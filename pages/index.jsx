import Head from "next/head";
import styles from "../styles/Home.module.scss";
import Header from "../components/Header";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Outfitted</title>
        <link rel="icon" type="image/png" href="/logo.jpg"/>
      </Head>
      <Header />
      <main className={styles.main}>
        <div className={styles.splashContainer}>
          <div className={styles.container}>
            <img src="https://i.imgur.com/bwOtzkG.jpg" alt="Minimalistic closet"/>
          </div>
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
