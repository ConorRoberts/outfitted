import React, { useState } from "react";
import useAdminStatus from "@utils/useAdminStatus";
import useAllItems from "@utils/useAllItems";
import useAllSettings from "@utils/useAllSettings";
import Loading from "@components/Loading";
import Header from "@components/Header";
import styles from "@styles/Admin.module.scss";
import { Switch } from "@chakra-ui/react";
import Link from "next/link";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  Button,
} from "@chakra-ui/react";

const Admin = () => {
  const admin = useAdminStatus();
  const [checked, setChecked] = useState(false);
  const items = useAllItems();
  const settings = useAllSettings();

  if (!admin || !items || !settings) return <Loading />;

  return (
    <div>
      <Header title="Admin" />
      <main className={styles.main}>
        <div className={styles.switchContainer}>
          <p>Show Users or Items</p>
          <Switch
            size="md"
            onChange={() => setChecked(!checked)}
            isChecked={checked}
          />
        </div>
        <div className={styles.list}>
          <Table variant="simple">
            <TableCaption placement="top">
              {checked ? "Items" : "Users"}
            </TableCaption>
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>{checked ? "Description" : "Email"}</Th>
                <Th>Link</Th>
              </Tr>
            </Thead>
            <Tbody>
              {checked
                ? items?.map(({ _id, name, description }) => (
                    <Tr key={_id}>
                      <Td>{name}</Td>
                      <Td>
                        {description.length > 100
                          ? `${description.substring(0, 100)} ...`
                          : description}
                      </Td>
                      <Td>
                        <Link passHref href={`/item/${_id}`}>
                          <Button>Link</Button>
                        </Link>
                      </Td>
                    </Tr>
                  ))
                : settings?.map(({ _user: { name, email, _id } }) => (
                    <Tr key={_id}>
                      <Td>{name}</Td>
                      <Td>{email}</Td>
                      <Td>
                        <Link passHref href={`/user/${_id}`}>
                          <Button>Link</Button>
                        </Link>
                      </Td>
                    </Tr>
                  ))}
            </Tbody>
          </Table>
        </div>
      </main>
    </div>
  );
};

export default Admin;
