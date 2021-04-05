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
const GET_ITEMS_DETAILED = gql`
  query GetItemsDetailed {
    items {
      _id
      name
      description
      images
      link
    }
  }
`;

const useAllItems = (detailed) => {
  const [items, setItems] = useState(false);
  const { data } = detailed
    ? useQuery(GET_ITEMS_DETAILED)
    : useQuery(GET_ITEMS);

  useEffect(() => setItems(data?.items), [data]);
  return items;
};

export default useAllItems;
