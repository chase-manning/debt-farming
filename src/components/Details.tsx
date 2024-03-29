import styled from "styled-components";
import Strategies from "./Strategies";

import gradient from "../assets/hero/portal.jpg";

const StyledDetails = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  position: relative;
  z-index: 1;
  overflow: hidden;

  @media (max-width: 600px) {
    height: auto;
    padding: 2rem;
    min-height: 100vh;
  }
`;

const Background = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
`;

const Header = styled.div`
  font-size: 3rem;
  text-align: center;

  @media (max-width: 600px) {
    font-size: 2rem;
    line-height: 1.2;
    margin-bottom: 3rem;
  }
`;

interface Props {
  token: string;
  setToken: (token: string) => void;
}

const Details = ({ token, setToken }: Props) => {
  return (
    <StyledDetails id="details-scroll">
      <Background src={gradient} alt="Gradient background" />
      <Header>The best yields using your favorite tokens</Header>
      <Strategies setToken={setToken} token={token} />
    </StyledDetails>
  );
};

export default Details;
