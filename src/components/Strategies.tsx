import styled from "styled-components";
import useStrategies, { Strategy } from "../views/strategies";
import Button from "./Button";
import table from "../assets/details/table.svg";

const StyledStrategies = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;

const Background = styled.img`
  height: 70vh;
`;

const Content = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding-bottom: 6vh;
  padding-right: 8.3vh;
  padding-left: 9vh;
  padding-top: 7.5vh;
`;

const Headers = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const Header = styled.div`
  flex: 1;
  font-size: 1.8rem;
  font-family: "Poppins", sans-serif;
  font-weight: 800;
`;

const HeaderEnd = styled.div`
  height: 1rem;
  width: 116px;
`;

const Row = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0.5rem 0;
`;

const Value = styled.div`
  flex: 1;
  font-size: 1.6rem;
  font-family: "Poppins", sans-serif;
  font-weight: 600;
`;

const roundToDp = (value: number, dp: number) => {
  return Math.round(value * 10 ** dp) / 10 ** dp;
};

const formatPercent = (value: number) => {
  return `${roundToDp(value, 2)}%`;
};

const Strategies = () => {
  const strategies = useStrategies("USDC");

  return (
    <StyledStrategies>
      <Background src={table} alt="Table background" />
      <Content>
        <Headers>
          <Header>Net APY</Header>
          <Header>Lending Protocol</Header>
          <Header>Debt Token</Header>
          <Header>Yield Protocol</Header>
          <Header>Yield Token</Header>
          <HeaderEnd />
        </Headers>
        {strategies
          .sort((a: Strategy, b: Strategy) => b.netApy - a.netApy)
          .slice(0, 10)
          .map((strategy: Strategy, index: number) => (
            <Row key={index}>
              <Value>{formatPercent(strategy.netApy)}</Value>
              <Value>{strategy.collateral.protocol}</Value>
              <Value>{strategy.debt.symbol}</Value>
              <Value>{strategy.yield.protocol}</Value>
              <Value>{strategy.yield.symbol}</Value>
              <Button click={() => console.log("meow")}>Details</Button>
              {/* <Value>Details</Value> */}
            </Row>
          ))}
      </Content>
    </StyledStrategies>
  );
};

export default Strategies;
