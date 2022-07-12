import styled from "styled-components";
import Cube from "./Cube";
import useStrategies, { Strategy } from "../views/strategies";

const StyledCubes = styled.div`
  position: absolute;
  top: 0;
  right: 0;
`;

const Cubes = () => {
  const usdcStrategies = useStrategies("USDC");
  const ethStrategies = useStrategies("ETH");
  const wbtcStrategies = useStrategies("WBTC");

  const getBestApy = (strategies: Strategy[]) => {
    if (strategies.length === 0) return 0;
    const apy = strategies.map((strategy) => strategy.netApy);
    return Math.round(Math.max(...apy));
  };

  return (
    <StyledCubes>
      <Cube
        apy={getBestApy(usdcStrategies)}
        position={2}
        show={usdcStrategies.length > 0}
        token="USDC"
      />
      <Cube
        apy={getBestApy(ethStrategies)}
        position={1}
        show={ethStrategies.length > 0}
        token="ETH"
      />
      <Cube
        apy={getBestApy(wbtcStrategies)}
        position={0}
        show={wbtcStrategies.length > 0}
        token="WBTC"
      />
    </StyledCubes>
  );
};

export default Cubes;
