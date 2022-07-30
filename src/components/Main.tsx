import { useState } from "react";
import styled from "styled-components";
import Details from "./Details";
import Hero from "./Hero";

// TODO Share on Twitter
// TODO List on all protocol sites

// TODO Create APY API
// TODO List on all APY Aggregators
// TODO Make open source
// TODO Add socials
// TOOD Add swap suppor for collateral
// TODO Farming clipping
// TODO Clickable elements on details popup
// TODO Performance analysis
// TODO Add tests for all apis
// TODO Add COMP rewards to calcs
// TODO ADD EUL rewards to calcs
// TODO Zaps
// TODO Portfolio viewer
// TODO Replace all images with gradients
// TODO Refactor the strategy popup so there is only one instead of many

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
      <Details token={token} setToken={(token: string) => setToken(token)} />
    </StyledHomePage>
  );
};

export default HomePage;
