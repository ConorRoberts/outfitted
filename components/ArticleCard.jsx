import styled from "styled-components";
import { theme } from "../globalStyles";
import React from "react";

const PersonCard = ({
  title = "Title",
  author = "Author",
  timestamp = new Date.now(),
  body = "Body",
  image,
}) => {
  return (
    <CardContainer>
      <CardImage>
        <img src={image} alt={title} />
      </CardImage>
      <CardText>
        <Header>
          <h4>{title}</h4>

          <p>
            Published by {author} on
            <span> {new Date(timestamp).toLocaleDateString()}</span>
          </p>
        </Header>
        <Body>
          <p>{body}</p>
        </Body>
      </CardText>
    </CardContainer>
  );
};

const CardImage = styled.div`
  height: 70%;
  /* max-height: 20rem; */
  overflow: hidden;
  position: relative;
  & > * {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
`;

const CardContainer = styled.div`
  position: relative;
  width: 18rem;
  font-family: "Roboto";
  height: 25rem;
  display: flex;
  flex-direction: column;
  color: white;
  border-radius: 7px;
  overflow: hidden;
  background: ${theme.bgLight};
`;

const CardText = styled.div`
  padding: 1rem;
  height: 5rem;
`;

const Header = styled.div`
  h4 {
    font-size: 1.6rem;
    font-weight: 500;
  }
  p {
    font-size: 0.8rem;
  }
`;
const Body = styled.div`
  font-size: 1rem;
`;

export default PersonCard;
