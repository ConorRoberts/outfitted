import { useState, useEffect } from "react";
import { gql, useQuery } from "@apollo/client";

const GET_USER_SETTINGS = gql`
  query GetUserSettings($id: String!) {
    settings(id: $id) {
      _id
      _user {
        _id
        name
        email
        image
      }
      likes {
        _id
        name
        description
        images
        category
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
      recommendations {
        _id
        timeLive
        timeRecommended
        body
        item{
          _id
          name
          description
          images
          category
        }
      }
    }
  }
`;

const useUserSettings = (id = "") => {
  const [settings, setSettings] = useState(null);
  const { data } = useQuery(GET_USER_SETTINGS, { variables: { id } });

  useEffect(() => setSettings(data?.settings), [data]);
  return settings;
};

export default useUserSettings;
