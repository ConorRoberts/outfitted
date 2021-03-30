import React from "react";
import Header from "@components/Header";
import Head from "next/head";
import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
} from "@chakra-ui/react";
import styles from "@styles/ItemPage.module.scss";
import { BsPencilSquare } from "react-icons/bs";
import Link from "next/link";

const GET_ITEM = gql`
  query getItem($id: String!) {
    item(id: $id) {
      _id
      name
      brand
      description
      seasons
      category
      occasions
      colours
      material
      price
      images
      builds
      sizes
      link
    }
  }
`;

const ItemPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data } = useQuery(GET_ITEM, { variables: { id: `${id}` } });

  return (
    <div>
      <Head>
        <title>{data?.item?.name} | Outfitted</title>
        <link rel="icon" type="image/png" href="/logo.jpg" />
      </Head>
      <Header />
      <main className={styles.main}>
        <div className={styles.imagesContainer}>
          {data?.item.images &&
            data?.item.images.map((image, index) => (
              <img key={`image-${index}`} src={image} />
            ))}
        </div>

        <div className={styles.editIconContainer}>
          <Link href={`/admin/create_item/${id}`}>
            <a className={styles.editIcon}>
              <BsPencilSquare />
            </a>
          </Link>
        </div>
        <Table>
          <TableCaption placement="top">Sizes</TableCaption>
          <Thead>
            <Tr>
              <Th>Property</Th>
              <Th>Value</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data &&
              Object.entries(data?.item)
                .slice(2, -1)
                .map(
                  ([key, val]) =>
                    key !== "images" && (
                      <Tr key={key}>
                        <Td className={styles.label}>{key}</Td>
                        <Td>{Array.isArray(val) ? val.join(", ") : val}</Td>
                      </Tr>
                    )
                )}
          </Tbody>
        </Table>
      </main>
    </div>
  );
};

export default ItemPage;
