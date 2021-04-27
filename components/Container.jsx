import React from "react";
import styled from "styled-components";
import { breakpoints } from "../globalStyles";

const Container = ({ children, size }) => {
  return <ResponsiveContainer>{children}</ResponsiveContainer>;
};

const ResponsiveContainer = styled.div`
  padding: 1rem;
  min-height:90vh;

  @media ${breakpoints.S} {
    padding: 1rem 10vw;
  }
  @media ${breakpoints.M} {
    padding: 1rem 15vw;
  }
  @media ${breakpoints.L} {
    padding: 1rem 20vw;
  }
`;

export default Container;
