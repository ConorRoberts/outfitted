import React from "react";
import Header from "@components/Header";
import styles from "@styles/Articles.module.scss";
import ArticlePreview from "@components/ArticlePreview";
import Loading from "@components/Loading";
import useArticlePreviews from "@utils/useArticlePreviews";
import styled from "styled-components";
import { theme } from "../../globalStyles";
import ArticleCard from "@components/ArticleCard";
import Container from "@components/Container";
import { Flex } from "@chakra-ui/react";

const Newsletter = () => {
  const articles = useArticlePreviews();

  if (!articles) return <Loading />;

  return (
    <div>
      <Header title="Articles" />
      <Container>
        <Title>Articles</Title>
        <List>
          {articles?.map((article) => (
            <ArticleCard key={article._id} {...article} />
          ))}
        </List>
      </Container>
    </div>
  );
};

const List = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content:center;
  & > * {
    margin: .5rem;
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  text-align: center;
  color: ${theme.accentMain};
  font-weight: 400;
  margin-bottom: 1rem;
`;

export default Newsletter;
