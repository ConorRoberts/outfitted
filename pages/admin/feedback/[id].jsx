import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
} from "@chakra-ui/react";
import { useQuery, gql } from "@apollo/client";
import Container from "@components/Container";
import Header from "@components/Header";

const GET_FEEDBACK = gql`
  query getFeedback($id: String!) {
    getFeedbackById(id: $id) {
      _id
      weekNumber
      creator {
        name
      }
      outfitChoice
      priceRange
      topPurchased
      bottomPurchased
      shoesPurchased
      wasGoodIcon
      iconFeedback
      didPurchasedIconPiece
      iconPiecesPurchased
      localFeedback
      goodLocalPick
      timestamp
    }
  }
`;

const translate_keys = {
  weekNumber: "Week Number",
  outfitChoice: "Outfit Choice",
  priceRange: "Price Range",
  topPurchased: "Top Purchased?",
  bottomPurchased: "Bottom Purchased?",
  shoesPurchased: "Shoes Purchased?",
  wasGoodIcon: "Good Style Icon?",
  iconFeedback: "Style Icon Feedback",
  didPurchasedIconPiece: "Purchased Icon Pieces?",
  iconPiecesPurchased: "Pieces Purchased",
  localFeedback: "Local Pick Feedback",
  goodLocalPick: "Good Local Pick?",
  timestamp: "Date Submitted",
  creator: "Creator Name",
};

const ViewFeedback = ({ id }) => {
  const { data } = useQuery(GET_FEEDBACK, { variables: { id: id } });

  return (
    <div>
      <Header title="Feedback" />
      <Container>
        <Table variant="simple">
          <TableCaption placement="top">Feedback</TableCaption>
          <Thead>
            <Tr>
              <Th>Key</Th>
              <Th>Value</Th>
            </Tr>
          </Thead>
          <Tbody>
            {Object.entries(data?.getFeedbackById ?? {})
              .slice(2)
              .map(([key, val], index) => {
                if (key === "creator") {
                  return (
                    <Tr key={`row-${index}`}>
                      <Td>{translate_keys[key]}</Td>
                      <Td>{val?.name ?? "Unknown"}</Td>
                    </Tr>
                  );
                }
                return (
                  <Tr key={`row-${index}`}>
                    <Td>{translate_keys[key]}</Td>
                    {key === "timestamp" ? (
                      <Td>{new Date(val).toLocaleDateString()}</Td>
                    ) : (
                      <Td>{Array.isArray(val) ? val.join(", ") : val}</Td>
                    )}
                  </Tr>
                );
              })}
          </Tbody>
        </Table>
      </Container>
    </div>
  );
};

export async function getServerSideProps(context) {
  return {
    props: { id: context.query.id },
  };
}
export default ViewFeedback;
