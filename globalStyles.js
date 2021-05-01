import styled, { createGlobalStyle, keyframes, css } from "styled-components";

const GlobalStyles = createGlobalStyle`
    *{margin:0;padding:0;box-sizing:border-box;}
    html{font-family:'Roboto',sans-serif;}
`;

export const theme = {
    lightBlue: "#13daec",
    bgMain: "#1a202c",
    bgLight: "#262f40",
    accentMain: "#93f3fe",
    textMain: "white",
}

export const breakpoints = {
    XS: `(min-width: 425px)`,
    S: `(min-width: 768px)`,
    M: `(min-width: 1024px)`,
    L: `(min-width: 1440px)`,
    XL: `(min-width: 2560px)`,
};

const dropInAnimation = keyframes`
    @keyframes dropIn {
        0% {
        opacity: 0;
        transform: translateY(-40%);
        }

        100% {
        opacity: 100%;
        transform: translateY(0%);
        }
    }
`;

export const animations = {
    dropIn: css`
        animation: ${dropInAnimation} 1s ease-in-out;
    `
}

export default GlobalStyles;