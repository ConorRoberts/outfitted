import { useState,useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import {useSession } from "next-auth/client";

const GET_SETTINGS = gql`
  query GetSettings($id: String!) {
    settings(id: $id) {
      admin
    }
  }
`;

const useAdminStatus = () => {
  const [session, loading] = useSession();
  const [uid, setUid] = useState("");
  const [admin, setAdmin] = useState(false);
  const { data } = useQuery(GET_SETTINGS, {
    variables: { id: `${uid}` },
  });

  useEffect(() => {
    if (session) setUid(session.user.id);
  }, [session]);

  useEffect(() => {
    if (data) setAdmin(data.settings.admin);
  }, [data]);

  return admin;
};

export default useAdminStatus;
