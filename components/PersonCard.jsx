import styled from "styled-components";
import { theme } from "../globalStyles";
import React from "react";
import { FaInstagram, FaLinkedinIn } from "react-icons/fa";
import Image from "next/image";

const PersonCard = ({
  name = "Name",
  title = "Title",
  image,
  desc = "Description",
  instaLink,
  linkedInLink,
}) => {
  return (
    <CardContainer>
      <CardInner>
        <CardFront>
          <CardImage>
            <Image
              priority
              src={image.path}
              layout="fixed"
              width={image.width}
              height={image.height}
            />
          </CardImage>
          <CardText>
            <h4>{name}</h4>
            <h5>{title}</h5>
          </CardText>
        </CardFront>
        <CardBack>
          <p>{desc}</p>
          <ul>
            {instaLink && (
              <li>
                <a href={instaLink}>
                  <FaInstagram />
                </a>
              </li>
            )}
            {linkedInLink && (
              <li>
                <a href={linkedInLink}>
                  <FaLinkedinIn />
                </a>
              </li>
            )}
          </ul>
        </CardBack>
      </CardInner>
    </CardContainer>
  );
};

const CardImage = styled.div`
  height: 20rem;
  overflow: hidden;
  & > * {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%) scale(0.4);
  }
`;

const CardFront = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: ${theme.bgLight};
  backface-visibility: hidden;
`;
const CardBack = styled.div`
  background: ${theme.bgLight};
  position: absolute;
  width: 100%;
  height: 100%;
  padding: 1rem;
  backface-visibility: hidden;
  transform: rotateY(180deg);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  ul {
    display: flex;
    justify-content: center;
    list-style-type: none;
    li {
      font-size: 1.8rem;
      a {
        color: white;
        transition: color 200ms ease;
        padding: 0.4rem;
        display: inline-block;

        &:hover {
          color: ${theme.accentMain};
        }
      }
    }
  }
`;

const CardInner = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.6s;
  transform-style: preserve-3d;
`;
const CardContainer = styled.div`
  width: 21rem;
  font-family: "Roboto";
  background-color: transparent;
  position: relative;
  height: 33rem;
  display: flex;
  flex-direction: column;
  color: white;
  border-radius: 7px;
  overflow: hidden;
  perspective: 1000px;
  &:hover ${CardInner} {
    transform: rotateY(180deg);
  }
`;

const CardText = styled.div`
  padding: 1rem;
  height: 5rem;
  h4 {
    font-size: 1.6rem;
    font-weight: 500;
  }
  h5 {
    font-size: 1.1rem;
    font-weight: 500;
  }
`;

export default PersonCard;
