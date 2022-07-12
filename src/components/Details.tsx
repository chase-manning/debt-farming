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
`;

const Background = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
`;

interface Props {
  token: string;
}

const Details = ({ token }: Props) => {
  return (
    <StyledDetails id="details-scroll">
      <Background src={gradient} alt="Gradient background" />
      <Strategies token={token} />
    </StyledDetails>
  );
};

export default Details;
