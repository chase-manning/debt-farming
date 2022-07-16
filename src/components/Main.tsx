import { useState } from "react";
import styled from "styled-components";
import Details from "./Details";
import Hero from "./Hero";

// TODO Add anylytics
// TODO Add base token toggle
// TODO Implement mobile
// TODO Update all metadata and SEO
// TODO Farming clipping
// TODO Swaps for collateral deposits

// TODO Launch
// TODO Max peer review
// TODO Vinnie peer review
// TODO share with backd
// TODO Share on Twitter

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
      <Details token={token} />
    </StyledHomePage>
  );
};

export default HomePage;
