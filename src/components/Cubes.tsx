import styled from "styled-components";
import { useEffect, useState } from "react";
import Cube from "./Cube";

const StyledCubes = styled.div`
  position: absolute;
  top: 0;
  right: 0;
`;

const Cubes = () => {
  const [showing, setShowing] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowing(true);
    }, 1000);
  }, []);

  return (
    <StyledCubes>
      <Cube apy={44} position={2} show={showing} />
      <Cube apy={44} position={1} show={showing} />
      <Cube apy={44} position={0} show={showing} />
    </StyledCubes>
  );
};

export default Cubes;
