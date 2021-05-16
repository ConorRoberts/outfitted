import React, { useEffect, useState } from "react";
import Header from "@components/Header";
import { useSession } from "next-auth/client";
import _ from "lodash";
import { BsPlusCircle } from "react-icons/bs";
import Container from "@components/Container";
import { useQuery, gql } from "@apollo/client";
import ItemPreviewCard from "@components/ItemPreviewCard";
import { Box, Flex } from "@chakra-ui/layout";
import styled, { keyframes } from "styled-components";
import { Button } from "@chakra-ui/button";
import { theme, breakpoints } from "../../globalStyles";

const dropInAnimation = keyframes`
      0% {
        opacity: 0;
        transform: translateY(-40%);
      }

      100% {
        opacity: 100%;
        transform: translateY(0%);
      }
`;

const WEEK_ZERO_START = new Date(2021, 5, 10);
const WEEK_MS = 1000 * 60 * 60 * 24 * 7;

// Function to convert date to a week number relative to WEEK ZERO
const getWeekNumber = (date) =>
  Math.abs(
    Math.round((new Date(date).getTime() - WEEK_ZERO_START.getTime()) / WEEK_MS)
  );

const GET_USER_SETTINGS = gql`
  query GetUserSettings($id: String!) {
    settings(id: $id) {
      recommendations {
        _id
        timeLive
        timeRecommended
        body
        item {
          _id
          name
          description
          images
          category
        }
      }
    }
  }
`;

const Recommendation = ({ recommendation }) => {
  const [open, setOpen] = useState(false);
  const { item, body } = recommendation;
  return (
    <RecommendationContainer>
      <Box margin="1rem 0">
        <ItemPreviewCard {...item} />
      </Box>
      <Flex align="center" direction="column" flex="1">
        <RecommendationBig>
          <RecommendationBody>
            <h4>What we think...</h4>
            <p>{body}</p>
          </RecommendationBody>
        </RecommendationBig>
        <RecommendationSmall>
          <Button leftIcon={<BsPlusCircle />} onClick={() => setOpen(!open)}>
            More
          </Button>
          {open && (
            <RecommendationBody>
              <h4>What we think...</h4>
              <p>{body}</p>
            </RecommendationBody>
          )}
        </RecommendationSmall>
      </Flex>
    </RecommendationContainer>
  );
};

const Newsletters = () => {
  const [session, loading] = useSession();

  const { data } = useQuery(GET_USER_SETTINGS, {
    variables: { id: `${session?.user?.id}` },
  });

  const [items, setItems] = useState([]);

  // Create a valid settings list from the one we're given from the API
  useEffect(() => {
    if (data?.settings) {
      const filteredItems = data.settings.recommendations
        .slice()
        .sort((a, b) => new Date(a.timeLive) - new Date(b.timeLive))
        .filter(
          ({ timeLive }) =>
            new Date(timeLive) <= Date.now() &&
            new Date(timeLive) >= WEEK_ZERO_START
        )
        .map((item) => ({
          ...item,
          weekNumber: getWeekNumber(item.timeLive),
        }));
      setItems(_.groupBy(filteredItems, "weekNumber"));
    }
  }, [data]);

  return (
    <div>
      <Header
        title={`${
          data?.settings ? data.settings?._user?.name : "Someone"
        }'s Newsletter`}
      />
      <Container>
        {Object.entries(items)
          .reverse()
          .map(([week, recommendations]) => (
            <div key={`items-week-${week}`}>
              <WeekTitle>Week #{week}</WeekTitle>
              {recommendations.map((r) => (
                <Recommendation recommendation={r} key={r._id} />
              ))}
            </div>
          ))}
      </Container>
    </div>
  );
};

const WeekTitle = styled.h3`
  color: ${theme.accentMain};
  font-size: 3rem;
  text-align: center;
  font-weight: 300;
`;
const RecommendationBody = styled.div`
  font-size: 1.2rem;
  animation: ${dropInAnimation} 0.4s ease;
  h4 {
    color: ${theme.accentMain};
    font-weight: 300;
    font-size: 1.6rem;
    text-align: center;
  }
`;
const RecommendationBig = styled.div`
  display: none;
  @media ${breakpoints.S} {
    display: block;
  }
`;

const RecommendationSmall = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  @media ${breakpoints.S} {
    display: none;
  }
`;
const RecommendationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media ${breakpoints.S} {
    flex-direction: row;
    justify-content: space-between;
  }
`;

export default Newsletters;
