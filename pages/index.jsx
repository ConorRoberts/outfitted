import styles from "@styles/Home.module.scss";
import Header from "@components/Header";
import { useSession } from "next-auth/client";
import Loading from "@components/Loading";
import useArticlePreviews from "@utils/useArticlePreviews";
import ArticlePreview from "@components/ArticlePreview";
import { FaInstagram, FaLinkedinIn } from "react-icons/fa";
import Footer from "@components/Footer";

const AboutUsModule = ({
  name = "Name",
  title = "Title",
  imageURL,
  desc = "Description",
  instaLink,
  linkedInLink,
}) => (
  <div className={styles.person}>
    <img src={imageURL ?? "https://picsum.photos/id/237/300/300"} />
    <div className={styles.textContainer}>
      <p className={styles.name}>{name}</p>
      <p className={styles.title}>{title}</p>
      <p className={styles.description}>{desc}</p>
      <ul className={styles.socials}>
        {instaLink && (
          <li>
            <a href={instaLink}>
              <FaInstagram />
            </a>
          </li>
        )}
        {linkedInLink && (
          <li>
            <a href={linkedInLink}>
              <FaLinkedinIn />
            </a>
          </li>
        )}
      </ul>
    </div>
  </div>
);

export default function Home() {
  const [_, loading] = useSession();

  const articles = useArticlePreviews();

  if (loading || !articles) return <Loading />;

  return (
    <div className={styles.mainContainer}>
      <Header title="Home" />
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
            "Taking the Stress out of
            <br />
            <span>Getting Dressed"</span>
          </h1>
          <p className={styles.intro}>
            Our Mission is to provide you with personalized style selections so
            they can look and feel good while saving time and money
          </p>
        </div>

        <h2 className={styles.titleBlock}>About Us</h2>
        <div className={styles.aboutContainer}>
          <div className={styles.people}>
            <AboutUsModule
              imageURL="https://static.wixstatic.com/media/52cf91_074368ca7e8140d691d4abc463f9e64a~mv2.jpeg/v1/crop/x_0,y_531,w_3003,h_3243/fill/w_199,h_216,al_c,q_80,usm_0.66_1.00_0.01/File_000.webp"
              name="Graham Anderson"
              linkedInLink="https://www.linkedin.com/in/graham-anderson-736869195/"
              instaLink="https://www.instagram.com/grahamandersonn/"
              desc="Graham is a current University of Guelph Marketing Management major with a passion for and drive to innovate as a entrepreneur."
              title="Co-Founder"
            />
            <AboutUsModule
              imageURL="https://static.wixstatic.com/media/52cf91_4bd27a68ed4846b699b57dfffd38f379~mv2.jpg/v1/crop/x_713,y_0,w_3243,h_3240/fill/w_216,h_216,al_c,q_80,usm_0.66_1.00_0.01/IMG_0089_JPG.webp"
              title="Co-Founder"
              desc="James is a current University of Guelph Economics and Finance major with a passion for the stock market."
              name="James Romain"
              instaLink="https://www.instagram.com/jamesromain59/"
              linkedInLink="https://www.linkedin.com/in/james-romain-27482b187/"
            />
            <AboutUsModule
              imageURL="https://conorroberts.com/_next/image?url=%2Fheadshot.JPG&w=3840&q=75"
              name="Conor Roberts"
              title="Web Developer"
              desc="Conor is a current University of Guelph Computer Science major with a passion for learning new technologies."
              linkedInLink="https://www.linkedin.com/in/conorjroberts/"
            />
          </div>
        </div>

        <h2 className={styles.titleBlock}>Recent Articles</h2>
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
