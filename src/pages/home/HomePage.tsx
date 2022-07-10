import styled from "styled-components";
import useStrategies from "../../contracts/strategies";

// TODO Account for borrowable amount
// TODO Add more lending protocols
// TODO Website
// TODO Add Convex cvxCRV pool
// TODO Add COMP rewards to calcs

const StyledHomePage = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  padding: 3rem;
  border: solid 1px orange;
`;

const Row = styled.div`
  width: 100%;
  display: flex;
`;

const Column = styled.div`
  font-size: 2rem;
  flex: 1;
`;

const roundToDp = (number: number, dp: number) => {
  return Math.round(number * 10 ** dp) / 10 ** dp;
};

const formatPercent = (number: number) => `${roundToDp(number, 2)}%`;

const HomePage = () => {
  const strategies = useStrategies("USDC");

  return (
    <StyledHomePage>
      {strategies
        .sort((a, b) => b.netApy - a.netApy)
        .map((s, index: number) => (
          <Row key={index}>
            <Column>{formatPercent(s.netApy)}</Column>
            <Column>{s.collateral.protocol}</Column>
            <Column>{s.collateral.symbol}</Column>
            <Column>{formatPercent(s.collateral.liquidityRate)}</Column>
            <Column>{s.debt.symbol}</Column>
            <Column>{formatPercent(s.debt.borrowRate)}</Column>
            <Column>{s.yield.symbol}</Column>
            <Column>{s.yield.protocol}</Column>
            <Column>{formatPercent(s.yield.apy)}</Column>
          </Row>
        ))}
    </StyledHomePage>
  );
};

export default HomePage;
