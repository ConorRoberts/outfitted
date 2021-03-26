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
      <Head>
        <title>{settings?._user?.name ?? "User"}</title>
        <link rel="icon" type="image/png" href="/logo.jpg"/>
      </Head>
      <Header />
      {settings && <UserPreview user={settings} />}
    </div>
  );
};

export default UserPage;
