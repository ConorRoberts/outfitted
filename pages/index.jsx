import Head from "next/head";
import styles from "@styles/Home.module.scss";
import Header from "@components/Header";
import { useSession } from "next-auth/client";
import Loading from "@components/Loading";
import useArticlePreviews from "@utils/useArticlePreviews";
import ArticlePreview from "@components/ArticlePreview";

export default function Home() {
  const [session, loading] = useSession();

  const articles = useArticlePreviews();

  if (loading || !articles) return <Loading />;

  return (
    <div>
      <Head>
        <title>Outfitted</title>
        <link rel="icon" type="image/png" href="/logo.jpg" />
      </Head>
      <Header />
      <main className={styles.main}>
        <div className={styles.splashContainer}>
          <div className={styles.container}>
            <img
              src="https://i.imgur.com/bwOtzkG.jpg"
              alt="Minimalistic closet"
            />
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

        <h2 className={styles.articlesTitle}>Recent Articles</h2>
        <div className={styles.articles}>
          <div className={styles.list}>
            {articles?.slice(0, 3).map((article) => (
              <div key={article._id} className={styles.article}>
                <ArticlePreview compact article={article} />
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
