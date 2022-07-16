import styled from "styled-components";
import { useProtocol } from "../views/protocols";
import { StrategyType } from "../views/strategies";
import Button from "./Button";
import Popup from "./Popup";
import Protocol from "./Protocol";
import Token from "./Token";

const StyledStrategy = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  height: 40px;

  @media (max-width: 600px) {
    height: 30px;
    > div:nth-child(2) {
      display: none;
    }
    > div:nth-child(3) {
      display: none;
    }
    > div:nth-child(4) {
      display: none;
    }
  }
`;

const Value = styled.div`
  flex: 1;
  font-size: 1.6rem;
  font-family: "Poppins", sans-serif;
  font-weight: 600;

  @media (max-width: 600px) {
    font-size: 1.2rem;
  }
`;

const Section = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const SubHeader = styled.div`
  width: 100%;
  font-size: 2.4rem;
  margin-bottom: 1rem;

  @media (max-width: 600px) {
    font-size: 1.8rem;
    margin-bottom: 0.7rem;
    margin-top: 4rem;
  }
`;

const Line = styled.div`
  width: 100%;
  font-size: 1.6rem;
  margin-top: 0.8rem;
  line-height: 1.4;
  font-family: "Poppins", sans-serif;
  font-weight: 600;

  @media (max-width: 600px) {
    font-size: 1.2rem;
    margin-top: 0.6rem;
  }
`;

const Container = styled.div`
  flex: 1;
`;

const HideOnMobile = styled.div`
  display: flex;

  @media (max-width: 600px) {
    display: none;
  }
`;

const ShowOnMobile = styled.div`
  display: none;

  @media (max-width: 600px) {
    display: flex;
  }
`;

const roundToDp = (value: number, dp: number) => {
  return Math.round(value * 10 ** dp) / 10 ** dp;
};

const formatPercent = (value: number) => {
  return `${roundToDp(value, 2)}%`;
};

interface Props {
  strategy: StrategyType;
  showing: boolean;
  mobileShowing: boolean;
  setShowing: () => void;
}

const Strategy = ({ showing, mobileShowing, strategy, setShowing }: Props) => {
  const requiresSwap = strategy.debt.symbol !== strategy.yield.symbol;
  const lendingProtocol = useProtocol(strategy.collateral.protocol);
  const yieldProtocol = useProtocol(strategy.yield.protocol);

  return (
    <>
      <StyledStrategy>
        <Value>{formatPercent(strategy.netApy)}</Value>
        <Protocol protocol={strategy.collateral.protocol} />
        <Container>
          <ShowOnMobile>
            <Value>{strategy.debt.symbol}</Value>
          </ShowOnMobile>
          <HideOnMobile>
            <Token symbol={strategy.debt.symbol} />
          </HideOnMobile>
        </Container>
        <Protocol protocol={strategy.yield.protocol} />
        <Container>
          <ShowOnMobile>
            <Value>{strategy.yield.symbol}</Value>
          </ShowOnMobile>
          <HideOnMobile>
            <Token symbol={strategy.yield.symbol} />
          </HideOnMobile>
        </Container>
        <Button
          click={() => {
            setShowing();
          }}
        >
          Details
        </Button>
      </StyledStrategy>
      <Popup
        mobileShow={mobileShowing}
        show={showing}
        close={() => {
          setShowing();
        }}
        header={`${strategy.collateral.symbol} ${strategy.yield.symbol} Strategy`}
      >
        <Section>
          <SubHeader>Overview</SubHeader>
          <Line>{`Earn ${formatPercent(strategy.netApy)} net yield on your ${
            strategy.collateral.symbol
          } by using it as collateral on ${
            lendingProtocol?.name || strategy.collateral.protocol
          } to borrow ${strategy.debt.symbol}${
            requiresSwap ? `, swapping it to ${strategy.yield.symbol},` : ""
          } and depositing it into ${
            yieldProtocol?.name || strategy.yield.protocol
          }.`}</Line>
        </Section>
        <Section>
          <SubHeader>Steps</SubHeader>
          <Line>{`1. Deposit ${strategy.collateral.symbol} as collateral on ${
            lendingProtocol?.name || strategy.collateral.protocol
          } earning ${formatPercent(
            strategy.collateral.liquidityRate
          )} yield.`}</Line>
          <Line>{`2. Borrow ${strategy.debt.symbol} on ${
            lendingProtocol?.name || strategy.collateral.protocol
          } using max ${formatPercent(
            strategy.collateral.collateralFactor * 100
          )} LTV at a ${formatPercent(
            strategy.debt.borrowRate
          )} interest rate.`}</Line>
          {requiresSwap && (
            <Line>{`3. Swap ${strategy.debt.symbol} for ${strategy.yield.symbol}.`}</Line>
          )}
          <Line>{`${requiresSwap ? 4 : 3}. Deposit ${
            strategy.yield.symbol
          } into ${
            yieldProtocol?.name || strategy.yield.protocol
          } earning ${formatPercent(strategy.yield.apy)} yield.`}</Line>
        </Section>
        <Section>
          <SubHeader>Maintenance</SubHeader>
          <Line>
            {`- Monitor your position on ${
              lendingProtocol?.name || strategy.collateral.protocol
            }, repaying or borrowing more ${
              strategy.debt.symbol
            } as needed to maintain a good health factor.`}
          </Line>
          <Line>
            {`- Monitor the interest rate for borrowing ${
              strategy.debt.symbol
            } on ${
              lendingProtocol?.name || strategy.debt.protocol
            }, and the yield for depositing ${strategy.yield.symbol} on ${
              yieldProtocol?.name || strategy.yield.protocol
            }. Ensuring there is a positive arbitrage opportunity.`}
          </Line>
        </Section>
      </Popup>
    </>
  );
};

export default Strategy;
