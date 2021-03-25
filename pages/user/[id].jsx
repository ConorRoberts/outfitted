import React from "react";
import UserPreview from "@components/UserPreview";
import Header from "@components/Header";
import { useRouter } from "next/router";
import useUserSettings from "@utils/useUserSettings";


const UserPage = () => {
    const router = useRouter();
    const { id } = router.query;
    const settings = useUserSettings(id);
  return (
    <div>
      <Header/>
      {settings && <UserPreview user={settings} />}
    </div>
  );
};

export default UserPage;
