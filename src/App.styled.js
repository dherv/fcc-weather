import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  body {
    color: ${(props) => props.color};
    font-family: Roboto, Arial, Helvetica, sans-serif;
    font-size: 16px;
  }
`;

export const Main = styled.main`
  background: ${(props) => props.background};
  height: 100vh;
`;

export const Section = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100%;
`;

export const Text = styled.p`
  color: #fff;
`;

export const StyledIcon = styled(Text)``;

export const Weather = styled(Text)`
  font-size: 2rem;
  font-weight: 600;
  margin-top: 1rem 0;
`;

export const Description = styled(Text)`
  font-size: 1rem;
  font-weight: 300;
  margin-bottom: 2rem;
`;

export const Temperature = styled(Text)`
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 2rem;
`;

export const City = styled(Text)`
  font-weight: 100;
`;
