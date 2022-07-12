import styled from "styled-components";
import Details from "./Details";
import Hero from "./Hero";

// TODO Website
// TODO Add loading indicator

// TODO Launch

// TODO Add tests for all apis
// TODO Add COMP rewards to calcs
// TODO ADD EUL rewards to calcs
// TODO Zaps
// TODO Portfolio viewer

const StyledHomePage = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HomePage = () => {
  return (
    <StyledHomePage>
      <Hero />
      <Details />
    </StyledHomePage>
  );
};

export default HomePage;
