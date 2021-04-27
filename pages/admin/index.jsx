import React, { useState } from "react";
import useAdminStatus from "@utils/useAdminStatus";
import Loading from "@components/Loading";
import Header from "@components/Header";
import { breakpoints } from "../../globalStyles";
import Link from "next/link";
import styled from "styled-components";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  Button,
  Select,
  FormLabel
} from "@chakra-ui/react";
import Container from "@components/Container";
import { useQuery, gql } from "@apollo/client";

const QUERY = gql`
  query GetTables {
    users {
      _user {
        name
        email
        _id
      }
    }
    items {
      _id
      name
      category
    }
    getAllFeedback {
      _id
      weekNumber
      creator {
        name
      }
    }
  }
`;

const UsersTable = ({ users = [] }) => {
  return users?.map(({ _user: { name, email, _id } }) => (
    <Tr key={_id}>
      <Td>{name}</Td>
      <HiddenTd>{email}</HiddenTd>
      <Td>
        <Link passHref href={`/user/${_id}`}>
          <Button background="#93F3FE" color="black">
            Link
          </Button>
        </Link>
      </Td>
    </Tr>
  ));
};

const ItemsTable = ({ items = [] }) => {
  return items.map(({ _id, name, category }) => (
    <Tr key={_id}>
      <Td>{name}</Td>
      <HiddenTd>{category}</HiddenTd>
      <Td>
        <Link passHref href={`/item/${_id}`}>
          <Button background="#93F3FE" color="black">
            Link
          </Button>
        </Link>
      </Td>
    </Tr>
  ));
};

const FeedbackTable = ({ list = [] }) => {
  return [...list]
    ?.sort((a, b) => a.weekNumber - b.weekNumber)
    .map(({ _id, creator, weekNumber }) => (
      <Tr key={_id}>
        <Td>{creator?.name ?? "Unknown"}</Td>
        <Td>{weekNumber}</Td>
        <Td>
          <Link passHref href={`/feedback/${_id}`}>
            <Button background="#93F3FE" color="black">
              Link
            </Button>
          </Link>
        </Td>
      </Tr>
    ));
};

const Admin = () => {
  const admin = useAdminStatus();
  const [selected, setSelected] = useState("Users");

  const { data } = useQuery(QUERY);

  if (!admin || !data) return <Loading />;

  return (
    <div>
      <Header title="Admin" />
      <Container>
        <SelectContainer>
          <Select onChange={(e) => setSelected(e.target.value)}>
            {["Users", "Items", "Feedback"].map((e, index) => (
              <option key={index} value={e}>
                {e}
              </option>
            ))}
          </Select>
        </SelectContainer>
        <Table variant="simple">
          <TableCaption placement="top">{selected}</TableCaption>
          <Thead>
            <Tr>
              <Th>Name</Th>
              {selected === "Items" && <HiddenTh>Category</HiddenTh>}
              {selected === "Feedback" && <Th>Week</Th>}
              {selected === "Users" && <HiddenTh>Email</HiddenTh>}
              <Th>Link</Th>
            </Tr>
          </Thead>
          <Tbody>
            {selected === "Users" && <UsersTable users={data?.users} />}
            {selected === "Items" && <ItemsTable items={data?.items} />}
            {selected === "Feedback" && (
              <FeedbackTable list={data?.getAllFeedback} />
            )}
          </Tbody>
        </Table>
      </Container>
    </div>
  );
};

const HiddenTh = styled(Th)`
  display: none;
  @media ${breakpoints.S} {
    display: table-cell;
  }
`;
const HiddenTd = styled(Td)`
  display: none;
  @media ${breakpoints.S} {
    display: table-cell;
  }
`;

const SelectContainer = styled.div`
  display: flex;
  justify-content: center;

  margin: 0 2rem;
  @media ${breakpoints.XS} {
    margin:0 10vw;
  }
  @media ${breakpoints.S} {
    margin:0 22vw;
  }
`;

export default Admin;
