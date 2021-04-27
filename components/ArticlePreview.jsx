import React from "react";
import Link from "next/link";
import styled from "styled-components";
import { theme,breakpoints } from "../globalStyles";

const ArticlePreview = ({ article }) => {
  const { title, image, timestamp, body, author, _id } = article;

  return (
    <Container>
      <StyledLink href={`/articles/${_id}`}>
        <PreviewContent>
          <PreviewImage src={`${image ?? "https://via.placeholder.com/500"}`} />
          <PreviewTextContainer>
            <Title>{title}</Title>
            {author && (
              <Author>
                Published by {author} on
                <span> {new Date(timestamp).toLocaleDateString()}</span>
              </Author>
            )}
            <Description>{`${body.substring(0, 150)}${
              body.length > 150 ? "..." : ""
            }`}</Description>
          </PreviewTextContainer>
        </PreviewContent>
      </StyledLink>
    </Container>
  );
};

const Author = styled.p`
  font-weight: 300;
  font-style: italic;
  font-size: 0.9rem;
  @media ${breakpoints.M} {
    margin-bottom: 0.5rem;
  }
`;

const Description = styled.p`
  display: none;
  font-weight: 300;
  font-size: 1rem;
  @media ${breakpoints.M} {
    display: block;
  }
`;
const PreviewTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media ${breakpoints.M} {
    margin-left: 2rem;
    width: 25rem;
  }
`;

const PreviewContent = styled.div`
  flex-direction: column;
  display: flex;
  justify-content: space-between;
  text-align: center;
  @media ${breakpoints.M} {
    flex-direction: row;
    justify-content: space-between;
  }
`;

const PreviewImage = styled.img`
  box-shadow: 0 0 20px black;
  width: 25rem;
  @media ${breakpoints.M} {
    width: 15rem;
  }
`;

const StyledLink = styled(Link)`
  cursor: pointer;
  width: 100%;
`;

const Title = styled.h4`
  margin-top: 0.5rem;
  font-weight: 500;
  font-size: 1.8rem;
  color: ${theme.accentMain};
`;

const Container = styled.div`
  cursor: pointer;
  width: 100%;
`;

export default ArticlePreview;
