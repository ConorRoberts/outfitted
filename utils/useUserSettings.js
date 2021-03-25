import { useState, useEffect } from "react";
import { gql, useQuery } from "@apollo/client";

const GET_USER_SETTINGS = gql`
  query GetUserSettings($id: String!) {
    settings(id: $id) {
      _id
      _user {
        name
        email
        image
      }
      likes {
        _id
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

const useUserSettings = (id = "") => {
  const [settings, setSettings] = useState(null);
  const { data } = useQuery(GET_USER_SETTINGS, { variables: { id } });

  useEffect(() => setSettings(data ? data.settings : null), [data]);
  return settings;
};

export default useUserSettings;
