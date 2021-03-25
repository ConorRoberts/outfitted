import React, { useEffect } from "react";
import styles from "@styles/Article.module.scss";
import ItemPreview from "@components/ItemPreview";
import { useSession } from "next-auth/client";
import { FaHeart } from "react-icons/fa";
import Loading from "@components/Loading";
import { gql, useMutation } from "@apollo/client";
import useUserSettings from "@utils/useUserSettings";

const LIKE_ITEM = gql`
  mutation likeItem($likeItemInput: LikeItemInput!) {
    likeItem(likeItemInput: $likeItemInput) {
      _id
      likes {
        _id
      }
    }
  }
`;

const findMatchingId = (settings, id) => {
  const arr = settings?.map((s) => s._id);
  return arr?.includes(id);
};

const Article = ({ article }) => {
  const {
    title = "Article",
    body = "",
    sections = [],
    author = "",
    featuredItems = [],
  } = article ?? {};

  const [likeItem, { data }] = useMutation(LIKE_ITEM);

  const [session, loading] = useSession();

  const settings = useUserSettings(session?.user?.id ?? "");

  if (loading || !settings) return <Loading />;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.author}>By {author}</p>
      <p className={styles.body}>{body}</p>
      {sections?.map((section, index) => (
        <div
          className={styles.sectionContainer}
          key={`${section.title}${index}`}
        >
          <h2 className={styles.sectionTitle}>{section.title}</h2>
          <div className={styles.sectionContent}>
            {section.image && (
              <img
                className={styles.sectionImage}
                src={section.image}
                alt={section.title}
              />
            )}
            <p className={styles.sectionBody}>{section.body}</p>
          </div>
        </div>
      ))}
      {featuredItems?.length !== 0 && (
        <>
          <h2 className={styles.sectionTitle}>Featured Items</h2>
          <div className={styles.featuredItems}>
            {featuredItems?.map((item) => (
              <div key={item._id} className={styles.featuredItemContainer}>
                <ItemPreview item={item} />
                <div
                  className={
                    findMatchingId(
                      data?.likeItem?.likes ?? settings?.likes,
                      item._id
                    )
                      ? styles.heartLiked
                      : styles.heart
                  }
                  onClick={() =>
                    likeItem({
                      variables: {
                        likeItemInput: {
                          user: session?.user?.id,
                          item: `${item._id}`,
                        },
                      },
                    })
                  }
                >
                  <FaHeart />
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Article;
