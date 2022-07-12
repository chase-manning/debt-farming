import styled from "styled-components";
import { Link } from "react-scroll";

import portal from "../assets/hero/portal.jpg";
import arrow from "../assets/hero/arrow.svg";

const StyledScrollButton = styled.button`
  display: flex;
  position: absolute;
  left: 7%;
  bottom: -25vh;
  height: 37vh;
  width: 40vh;
  cursor: pointer;

  :hover {
    > div:first-child {
      transform: translateY(10px);
    }
    > img {
      transform: translate(-50%, calc(-20% + 10px));
    }
  }
`;

const Circle = styled.div`
  overflow: hidden;
  position: relative;
  height: 100%;
  width: 100%;
  border-radius: 50%;
  overflow: hidden;
  transition: all 0.3s;
`;

const Arrow = styled.img`
  position: absolute;
  left: 50%;
  top: 0;
  transform: translate(-50%, -20%);
  height: 10vh;
  transition: all 0.3s;
`;

const Gradient = styled.img`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 100%;
  width: 100%;
`;

const ScrollButton = () => {
  return (
    <Link to="details-scroll" spy smooth duration={1000}>
      <StyledScrollButton>
        <Circle>
          <Gradient src={portal} alt="Decorative gradient" />
        </Circle>
        <Arrow src={arrow} alt="Arrow" />
      </StyledScrollButton>
    </Link>
  );
};

export default ScrollButton;
