import { useState, useEffect } from "react";
import { gql, useQuery } from "@apollo/client";

const getArticles = gql`
  query GetArticles {
    articles {
      _id
      title
      image
      timestamp
      author
    }
  }
`;

const useArticlePreviews = () => {
  const [articles, setArticles] = useState(null);
  const { data } = useQuery(getArticles);

  useEffect(() => setArticles(data?.articles), [data]);
  return articles;
};

export default useArticlePreviews;
