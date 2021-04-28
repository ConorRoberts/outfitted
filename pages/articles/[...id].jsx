import { useRouter } from "next/router";
import { gql, useQuery, useMutation } from "@apollo/client";
import Header from "@components/Header";
import React, { useEffect } from "react";
import { useSession } from "next-auth/client";
import { FaHeart } from "react-icons/fa";
import Loading from "@components/Loading";
import useUserSettings from "@utils/useUserSettings";
import { AiOutlineEdit } from "react-icons/ai";
import useAdminStatus from "@utils/useAdminStatus";
import Link from "next/link";
import Container from "@components/Container";
import styled from "styled-components";
import { theme, breakpoints } from "../../globalStyles";
import { Button, Flex } from "@chakra-ui/react";
import _ from "lodash";

const GET_ARTICLE = gql`
  query GetArticle($id: String!) {
    article(id: $id) {
      title
      body
      image
      author
      timestamp
      featuredItems {
        _id
        name
        images
        description
        link
      }
      sections {
        title
        body
        image
      }
    }
  }
`;
const LIKE_ITEM = gql`
  mutation likeItem($userId: String!, $itemId: String!) {
    likeItem(userId: $userId, itemId: $itemId) {
      _id
      likes {
        _id
      }
    }
  }
`;

const FeaturedItemsList = ({ items, userId }) => {
  const [likeItem, { data }] = useMutation(LIKE_ITEM);

  const isItemLiked = (itemId) => {
    if (data) {
      const liked = _.find(data.likeItem.likes, { _id: itemId });
      return liked ? true : false;
    }
    return false;
  };

  return (
    <FeaturedItemsListContainer>
      {items?.map((item, index) => (
        <FeaturedItemContainer key={`featured-${index}`}>
          <FeaturedItemImage>
            <Link href={`/item/${item._id}`}>
              <a>
                <img alt={item.name} src={item.images && item.images[0]} />
              </a>
            </Link>
          </FeaturedItemImage>
          <FeaturedItemText>
            <FeaturedItemTitle>{item.name}</FeaturedItemTitle>
            <FeaturedItemDescription>
              {item.description}
            </FeaturedItemDescription>
            <Flex justify="center">
              <Button
                margin="1rem 0"
                onClick={() =>
                  likeItem({ variables: { userId: userId, itemId: item._id } })
                }
                leftIcon={
                  <FaHeart
                    color={isItemLiked(item._id) ? theme.accentMain : "white"}
                  />
                }
              >
                Like
              </Button>
            </Flex>
          </FeaturedItemText>
        </FeaturedItemContainer>
      ))}
    </FeaturedItemsListContainer>
  );
};

const ArticleSection = ({ section }) => {
  return (
    <SectionContainer>
      <SectionTitle>{section.title}</SectionTitle>
      <SectionContent>
        {section.image && (
          <SectionImage src={section.image} alt={section.title} />
        )}
        <SectionBody>{section.body}</SectionBody>
      </SectionContent>
    </SectionContainer>
  );
};

const ArticlePage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data } = useQuery(GET_ARTICLE, {
    variables: { id: "" + id },
  });

  const [session, loading] = useSession();

  const settings = useUserSettings(session?.user?.id ?? "");

  const admin = useAdminStatus();

  if (loading || !settings) return <Loading />;

  return (
    <div>
      <Header title={data?.article?.title} />
      <Container>
        {admin && (
          <Flex justify="center">
            <Link href={`/admin/articles/edit/${id}`}>
              <Button fontSize="1rem" leftIcon={<AiOutlineEdit />}>
                Edit
              </Button>
            </Link>
          </Flex>
        )}
        <Title>{data?.article?.title}</Title>
        <Author>By {data?.article?.author}</Author>
        <Body>{data?.body}</Body>
        {data?.article?.sections?.map((section, index) => (
          <ArticleSection section={section} key={`section-${index}`} />
        ))}
        <SectionTitle>Featured Items</SectionTitle>
        <FeaturedItemsList
          userId={session?.user?.id}
          items={data?.article?.featuredItems}
        />
      </Container>
    </div>
  );
};

const Title = styled.h1`
  font-weight: 500;
  color: ${theme.accentMain};
  font-size: 2rem;
  text-align: center;
`;

const Body = styled.p`
  font-weight: 500;
  font-size: 1rem;
`;

const Author = styled.p`
  font-size: 1.2rem;
  font-weight: 300;
  text-align: center;
`;

const SectionContainer = styled.div``;

const SectionContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;

  @media ${breakpoints.M} {
    flex-direction: row;
  }
`;

const SectionImage = styled.img`
  box-shadow: 0 3px 5px black;
  border-radius: 5px;
  overflow: hidden;
  @media ${breakpoints.M} {
    margin-right: 0.6rem;
    width: 40%;
  }
`;

const SectionBody = styled.p`
  font-weight: 300;
  font-size: 1rem;
  text-align: justify;
  margin-top: 1rem;
  @media ${breakpoints.M} {
    font-size: 1.1rem;
    margin-top: 0;
    margin-left: 0.6rem;
    width: 50%;
  }
`;
const SectionTitle = styled.h2`
  color: ${theme.accentMain};
  box-shadow: 0 1px 3px black;
  font-size: 1.7rem;
  letter-spacing: 0.05rem;
  margin: 0.7rem 0;
  text-align: center;
  text-transform: uppercase;
  font-weight: 400;
  padding: 0.5rem;
`;

const FeaturedItemsListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  @media ${breakpoints.S} {
    align-items: flex-start;
  }
`;
const FeaturedItemContainer = styled.div`
  margin: 0.5rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media ${breakpoints.S} {
    flex-direction: row;
    width: 100%;
  }
`;

const FeaturedItemText = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  @media ${breakpoints.M} {
    width: 65%;
  }
`;
const FeaturedItemTitle = styled.h3`
  color: ${theme.accentMain};
  font-weight: 400;
  font-size: 1.5rem;
  padding-left: 1rem;
`;
const FeaturedItemDescription = styled.p`
  padding-left: 1rem;
`;

const FeaturedItemImage = styled.div`
  width: 100%;
  @media ${breakpoints.S} {
    width: 35%;
  }
`;

export default ArticlePage;
