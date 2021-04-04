import React from "react";
import UserPreview from "@components/UserPreview";
import Header from "@components/Header";
import { useRouter } from "next/router";
import useUserSettings from "@utils/useUserSettings";
import Head from "next/head";

const UserPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const settings = useUserSettings(id);
  return (
    <div>
      <Header title={settings?._user?.name ?? "User"} />
      {settings && <UserPreview user={settings} />}
    </div>
  );
};

export default UserPage;
