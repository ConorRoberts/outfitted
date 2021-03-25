import { useState, useEffect } from "react";
import { gql, useQuery } from "@apollo/client";

const GET_USERS = gql`
  query GetUsers {
    users {
      _id
      _user {
        name
        email
        image
      }
      likes {
        name
        description
        images
      }
      gender
      build
      height
      birthday
      shoeSize
      favBrands
      sustainable
      fit
      favColours
      pantsSize
      sweaterSize
      shirtSize
      styleIcons
      favInfluencers
    }
  }
`;

const useAllSettings = () => {
  const [users, setUsers] = useState([]);
  const { data } = useQuery(GET_USERS);

  useEffect(() => setUsers(data?.users), [data]);
  return users;
};

export default useAllSettings;
