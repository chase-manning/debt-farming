import { useState } from "react";
import styled from "styled-components";

import cube from "../assets/hero/cube.svg";

const Container = styled.div`
  transition: all 1s ease-out;
`;

interface CubeProps {
  position: number;
}

const StyledCube = styled.div`
  display: flex;
  height: 30vh;
  position: absolute;
  top: 0;
  right: 0;
  transform: translate(
    calc(${(props: CubeProps) => 0 - props.position * 50}%),
    -35%
  );
`;

const Asset = styled.img`
  height: 100%;
`;

const Face = styled.div`
  position: absolute;
  display: flex;
  cursor: pointer;

  bottom: 2px;
  left: 2px;
  height: 41.5%;
  width: 34.8%;
  background: linear-gradient(-45deg, #efa8d7, #f9f2d7);
`;

const Apy = styled.div``;

interface Props {
  position: number;
  apy: number;
  show: boolean;
}

const Cube = ({ position, apy, show }: Props) => {
  const [isHover, setIsHover] = useState(false);

  const transform = () => {
    const base = show ? 0 : 200;
    const hover = isHover ? 20 : 0;
    return base + hover;
  };

  return (
    <Container
      style={{ transform: `translate(${transform()}px, -${transform()}px)` }}
    >
      <StyledCube position={position}>
        <Asset src={cube} alt="Decorative cube" />
        <Face
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        >
          meow
        </Face>
      </StyledCube>
    </Container>
  );
};

export default Cube;
