import React, { useState } from "react";
import useAdminStatus from "../../utils/useAdminStatus";
import Loading from "../../components/Loading";
import Header from "../../components/Header";
import { gql, useQuery } from "@apollo/client";
import ItemPreview from "../../components/ItemPreview";
import styles from "../../styles/Admin.module.scss";
import { Switch } from "@chakra-ui/react";

const GET_ITEMS = gql`
  query GetItems {
    items {
      _id
      name
      description
      images
    }
  }
`;

const Admin = () => {
  const admin = useAdminStatus();
  const { data } = useQuery(GET_ITEMS);
  const [checked, setChecked] = useState(false);

  if (!admin) return <Loading />;

  return (
    <div>
      <Header />
      <main className={styles.main}>
        <div className={styles.switchContainer}>
          <p>Show Items/Users</p>
          <Switch
            size="md"
            onChange={() => setChecked(!checked)}
            isChecked={checked}
          />
        </div>
        <div className={styles.itemList}>
          {data?.items?.map((item) => (
            <ItemPreview key={item._id} item={item} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Admin;
