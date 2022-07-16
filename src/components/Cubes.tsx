import styled from "styled-components";
import Cube from "./Cube";
import useStrategies, { StrategyType } from "../views/strategies";

const StyledCubes = styled.div`
  position: absolute;
  top: 0;
  right: 0;
`;

interface Props {
  setToken: (token: string) => void;
}

const Cubes = ({ setToken }: Props) => {
  const usdcStrategies = useStrategies("USDC");
  const ethStrategies = useStrategies("ETH");
  const wbtcStrategies = useStrategies("WBTC");

  const getBestApy = (strategies: StrategyType[]) => {
    if (strategies.length === 0) return 0;
    const apy = strategies.map((strategy) => strategy.netApy);
    return Math.round(Math.max(...apy));
  };

  return (
    <StyledCubes>
      <Cube
        setToken={setToken}
        apy={getBestApy(usdcStrategies)}
        position={2}
        show={usdcStrategies.length > 0}
        token="USDC"
      />
      <Cube
        setToken={setToken}
        apy={getBestApy(ethStrategies)}
        position={1}
        show={ethStrategies.length > 0}
        token="ETH"
      />
      <Cube
        setToken={setToken}
        apy={getBestApy(wbtcStrategies)}
        position={0}
        show={wbtcStrategies.length > 0}
        token="WBTC"
      />
    </StyledCubes>
  );
};

export default Cubes;
