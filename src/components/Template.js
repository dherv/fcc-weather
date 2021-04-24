import React from "react";
import { Main, Section } from "../App.styled";
import { GlobalStyle } from "../styled/globals.styled";

export const Template = ({ children, main }) => {
  const design = {
    Clouds:
      "linear-gradient(180deg, rgba(144, 164, 174, 1) 0%, rgba(144, 164, 174, .8) 100%);",
    Rain:
      "linear-gradient(180deg, rgba(63, 81, 181, 1) 0%, rgba(63, 81, 181, .8) 100%);",
    Sun:
      "linear-gradient(180deg, rgba(255, 179, 0, 1) 0%, rgba(255, 179, 0, .8) 100%);",
  };
  return (
    <>
      <GlobalStyle />
      <Main background={design[main]}>
        <Section>{children}</Section>
      </Main>
    </>
  );
};
