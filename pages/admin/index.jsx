import React, { useEffect, useState } from "react";
import useAdminStatus from "../../utils/useAdminStatus";
import Loading from "../../components/Loading";
import Header from "../../components/Header";

const Admin = () => {
  const admin = useAdminStatus();

  if (!admin) return <Loading />;

  return (
    <div>
      <Header />
    </div>
  );
};

export default Admin;
