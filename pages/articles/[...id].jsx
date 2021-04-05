import { useRouter } from "next/router";
import { gql, useQuery, useMutation } from "@apollo/client";
import Header from "@components/Header";
import styles from "@styles/ArticlePage.module.scss";
import React, { useEffect } from "react";
import ItemPreview from "@components/ItemPreview";
import { useSession } from "next-auth/client";
import { FaHeart } from "react-icons/fa";
import Loading from "@components/Loading";
import useUserSettings from "@utils/useUserSettings";

const GET_ARTICLE = gql`
  query GetArticle($id: String!) {
    article(id: $id) {
      title
      body
      image
      author
      timestamp
      featuredItems {
        _id
        name
        images
        description
        link
      }
      sections {
        title
        body
        image
      }
    }
  }
`;
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

const ArticlePage = () => {
  const router = useRouter();
  const { id } = router.query;
  const articleQuery = useQuery(GET_ARTICLE, {
    variables: { id: "" + id },
  });

  const [likeItem, { data }] = useMutation(LIKE_ITEM);

  const [session, loading] = useSession();

  const settings = useUserSettings(session?.user?.id ?? "");

  if (loading || !settings) return <Loading />;

  return (
    <div>
      <Header title={articleQuery?.data.article?.title} />
      <div className={styles.container}>
        <h2 className={styles.title}>{articleQuery?.data.article?.title}</h2>
        <p className={styles.author}>By {articleQuery?.data.article?.author}</p>
        <p className={styles.body}>{articleQuery?.data.body}</p>
        {articleQuery?.data.article?.sections?.map((section, index) => (
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
        {articleQuery?.data.article?.featuredItems?.length > 0 && (
          <>
            <h2 className={styles.sectionTitle}>Featured Items</h2>
            <div className={styles.featuredItems}>
              {articleQuery?.data.article?.featuredItems?.map((item) => (
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
    </div>
  );
};

export default ArticlePage;
