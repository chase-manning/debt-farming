import { useState } from "react";
import styled from "styled-components";
import Details from "./Details";
import Hero from "./Hero";

// TODO Website
// TODO Add loading indicator
// TODO Add protocol displays
// TODO Add token symbols
// TODO Change Yield Token to Strategy
// TODO Implement details popup
// TODO Setup domain name
// TODO Add base token toggle
// TODO Add button to home
// TODO Add functionality to BTC, ETH, and USDC buttons
// TODO Implement mobile
// TODO Add description to details
// TODO Update all metadata and SEO

// TODO Launch
// TODO share with backd
// TODO Share on Twitter

// TODO Add tests for all apis
// TODO Add COMP rewards to calcs
// TODO ADD EUL rewards to calcs
// TODO Zaps
// TODO Portfolio viewer
// TODO Replace all images with gradients

const StyledHomePage = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HomePage = () => {
  const [token, setToken] = useState("USDC");

  return (
    <StyledHomePage>
      <Hero setToken={(token: string) => setToken(token)} />
      <Details token={token} />
    </StyledHomePage>
  );
};

export default HomePage;
