import { useState, useEffect } from "react";
import { gql, useQuery } from "@apollo/client";

const GET_ITEMS = gql`
  query GetItems {
    items {
      _id
      name
      description
      images
      link
      category
    }
  }
`;

const useAllItems = (detailed) => {
  const [items, setItems] = useState(null);
  const { data } = useQuery(GET_ITEMS);

  useEffect(() => setItems(data?.items), [data]);
  return items;
};

export default useAllItems;
