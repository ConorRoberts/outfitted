import Header from "@components/Header";
import { useSession } from "next-auth/client";
import Loading from "@components/Loading";
import useArticlePreviews from "@utils/useArticlePreviews";
// import ArticlePreview from "@components/ArticlePreview";
import Container from "@components/Container";
import styled from "styled-components";
import { theme, breakpoints, animations } from "../globalStyles";
import React from "react";
import { Flex } from "@chakra-ui/react";
import PersonCard from "@components/PersonCard";
import ArticleCard from "@components/ArticleCard";
import Link from "next/link";

export default function Home() {
  const [_, loading] = useSession();

  const articles = useArticlePreviews();

  if (loading || !articles) return <Loading />;

  return (
    <div>
      <Header title="Home" />
      <Container>
        <Splash>
          <div>
            <img
              src="https://i.imgur.com/bwOtzkG.jpg"
              alt="Minimalistic closet"
            />
          </div>
        </Splash>
        <TitleContainer>
          <h1>
            "Taking the Stress out of
            <br />
            <span>Getting Dressed"</span>
          </h1>
          <p>
            Our Mission is to provide you with personalized style selections so
            they can look and feel good while saving time and money
          </p>
        </TitleContainer>

        <SectionTitle>About Us</SectionTitle>
        <Flex justify="center" wrap="wrap" gridGap="10">
          <PersonCard
            image={{
              path: "/Graham_bio_image.jpg",
              width: 893,
              height: 1049,
            }}
            name="Graham Anderson"
            linkedInLink="https://www.linkedin.com/in/graham-anderson-736869195/"
            instaLink="https://www.instagram.com/grahamandersonn/"
            desc="Graham Anderson is a current University of Guelph student studying Marketing Management. Graham founded Outfitted with his co-founder James Romain with the belief that everyone should be able to find their own style and feel confident about the clothes in their closet. Graham’s goals for Outfitted are to grow the businesses presence in the targeted social media spaces as well as focusing on giving users the highest quality clothing suggestions. Since starting Outfitted Graham has learned a lot about entrepreneurship including the ins and outs of running a business and is looking to continue learning as the business grows. Graham has a passion for Managing and a drive to innovate as an entrepreneur."
            title="Co-Founder"
          />
          <PersonCard
            image={{
              path: "/James_bio_image.jpg",
              width: 869,
              height: 1061,
            }}
            title="Co-Founder"
            desc="James is a current University of Guelph Economics and Finance major with a passion for the stock market."
            name="James Romain"
            instaLink="https://www.instagram.com/jamesromain59/"
            linkedInLink="https://www.linkedin.com/in/james-romain-27482b187/"
          />
          <PersonCard
            image={{
              path: "/Conor_bio_image.jpg",
              width: 907,
              height: 1060,
            }}
            name="Conor Roberts"
            title="Web Developer"
            desc="Conor is a current full-stack developer and Computer Science Major at the University of Guelph. "
            linkedInLink="https://www.linkedin.com/in/conorjroberts/"
          />
        </Flex>

        <SectionTitle>Recent Articles</SectionTitle>
        {/* <ArticleList>
          <div>
            {articles?.slice(0, 3).map((article) => (
              <ArticleContainer key={article._id}>
                <ArticlePreview compact article={article} />
              </ArticleContainer>
            ))}
          </div>
        </ArticleList> */}
        <Flex gridGap="10" wrap="wrap" justify="center">
          {articles?.slice(0, 3).map((article) => (
            <Link href={`/articles/${article._id}`} key={article._id}>
              <a>
                <ArticleCard {...article} />
              </a>
            </Link>
          ))}
        </Flex>
      </Container>
    </div>
  );
}

const Splash = styled.div`
  display: flex;
  justify-content: center;
  div {
    display: flex;
    box-shadow: 0 0 5px black;
    width: 100%;
    @media (min-width: 1000px) {
      width: 80%;
    }
    img {
      height: 100%;
      width: 100%;
    }
  }
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding-top: 2rem;
  @media ${breakpoints.M} {
    padding: 0 10rem;
  }
  h1 {
    line-height: 2.4rem;
    font-size: 1.9rem;
    font-weight: 400;
    color: white;
    span {
      color: ${theme.accentMain};
    }
  }
  p {
    border-left: 3px solid ${theme.accentMain};
    margin: 1.5rem;
    font-size: 1.2rem;
    font-weight: 300;
    padding-left: 1rem;
    text-align: left;
    width: 100%;
    @media (min-width: ${breakpoints.M}) {
      width: 80%;
    }
  }
`;

const SectionTitle = styled.h2`
  background: ${theme.bgLight};
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  font-size: 2.5rem;
  font-weight: 400;
  color: ${theme.accentMain};
  box-shadow: 0 0 5px black;
  margin: 2rem 0;
  padding: 0.2rem 0;
  width: 90%;

  @media (min-width: ${breakpoints.M}) {
    width: 70%;
  }
  @media (min-width: ${breakpoints.L}) {
    width: 85%;
  }
`;

const ArticleList = styled.div`
  display: flex;
`;
// const ArticleList = styled.div`
//   display: flex;
//   justify-content: center;
//   margin-bottom: 1rem;
//   width: 100%;
//   div {
//     width: 25rem;
//     margin: 0 5vw;
//     display: flex;
//     align-items: center;
//     flex-direction: column;
//     @media (min-width: ${breakpoints.M}) {
//       width: 55rem;
//     }
//   }
// `;

const ArticleContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 1rem 0;
  cursor: pointer;
  width: 100%;
`;
