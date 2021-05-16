import React from "react";
import { Flex } from "@chakra-ui/react";
import { theme, breakpoints } from "../globalStyles";
import styled from "styled-components";
import Link from "next/link";

const ItemPreviewCard = ({ name, images, category, description, _id }) => {
  const [image] = images;
  return (
    <Link href={`/item/${_id}`}>
      <ItemPreviewContainer>
        <Flex w="15rem" position="relative" overflow="hidden" height="15rem">
          <img src={image} />
        </Flex>
        <Flex direction="column" w="100%">
          <h4>
            {name}
            <span>({category})</span>
          </h4>
          <p>{description}</p>
        </Flex>
      </ItemPreviewContainer>
    </Link>
  );
};

const ItemPreviewContainer = styled.div`
  cursor: pointer;
  border-radius: 15px;
  background: ${theme.bgLight};
  display: flex;
  flex-direction: column;
  align-items: center;
  text-transform: capitalize;
  padding: 1rem;
  font-family: "Roboto";
  letter-spacing: 0.08rem;
  img {
    border-radius:15px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  h4 {
    color: ${theme.accentMain};
    font-weight: 500;
    font-size: 1.4rem;
    span {
      margin-left: 0.2rem;
      color: white;
      font-weight: 300;
      font-size: 1.1rem;
    }
  }
  p {
    font-weight: 300;
  }

  /* @media ${breakpoints.S} {
    flex-direction: row;
  } */
`;

export default ItemPreviewCard;
