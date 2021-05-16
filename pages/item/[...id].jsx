import React from "react";
import Header from "@components/Header";
import Container from "@components/Container";
import { AiOutlineShopping } from "react-icons/ai";
import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  Button,
  Flex,
} from "@chakra-ui/react";
import { BsPencilSquare } from "react-icons/bs";
import Link from "next/link";
import styled from "styled-components";

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
      <Header title={data?.item?.name} />
      <Container>
        <ImagesContainer>
          {data?.item.images &&
            data?.item.images.map((image, index) => (
              <img key={`image-${index}`} src={image} />
            ))}
        </ImagesContainer>

        <Flex direction="column" align="center">
          <Link href={data?.item.link ?? ""}>
            <Button>
              <AiOutlineShopping />
              Shop This Item
            </Button>
          </Link>

          <Link href={`/admin/items/edit/${id}`}>
            <Button margin="1rem 0" leftIcon={<BsPencilSquare />}>
              Edit
            </Button>
          </Link>
        </Flex>

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
                        <Label>{key}</Label>
                        <Td>{Array.isArray(val) ? val.join(", ") : val}</Td>
                      </Tr>
                    )
                )}
          </Tbody>
        </Table>
      </Container>
    </div>
  );
};

const Label = styled(Td)`
  text-transform: capitalize;
  font-weight: 500;
`;

const ImagesContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;

  & > * {
    flex: 0 1 20rem;
    width: 20rem;
  }
`;

export default ItemPage;
