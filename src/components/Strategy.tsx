import { useState } from "react";
import styled from "styled-components";
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
`;

const Value = styled.div`
  flex: 1;
  font-size: 1.6rem;
  font-family: "Poppins", sans-serif;
  font-weight: 600;
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
`;

const Line = styled.div`
  width: 100%;
  font-size: 1.6rem;
  margin-top: 0.8rem;
  line-height: 1.4;
  font-family: "Poppins", sans-serif;
  font-weight: 600;
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
  setShowing: () => void;
}

const Strategy = ({ showing, strategy, setShowing }: Props) => {
  const requiresSwap = strategy.debt.symbol !== strategy.yield.symbol;

  return (
    <>
      <StyledStrategy>
        <Value>{formatPercent(strategy.netApy)}</Value>
        <Protocol protocol={strategy.collateral.protocol} />
        <Token symbol={strategy.debt.symbol} />
        <Protocol protocol={strategy.yield.protocol} />
        <Token symbol={strategy.yield.symbol} />
        <Button
          click={() => {
            setShowing();
          }}
        >
          Details
        </Button>
      </StyledStrategy>
      <Popup
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
            strategy.collateral.protocol
          } to borrow ${strategy.debt.symbol}${
            requiresSwap ? `, swapping it to ${strategy.yield.symbol},` : ""
          } and depositing it into ${strategy.yield.protocol}.`}</Line>
        </Section>
        <Section>
          <SubHeader>Steps</SubHeader>
          <Line>{`1. Deposit ${strategy.collateral.symbol} as collateral on ${
            strategy.collateral.protocol
          } earning ${formatPercent(
            strategy.collateral.liquidityRate
          )} yield.`}</Line>
          <Line>{`2. Borrow ${strategy.debt.symbol} on ${
            strategy.debt.protocol
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
          } into ${strategy.yield.protocol} earning ${formatPercent(
            strategy.yield.apy
          )} yield.`}</Line>
        </Section>
        <Section>
          <SubHeader>Maintenance</SubHeader>
          <Line>
            {`- Monitor your position on ${strategy.collateral.protocol}, repaying or borrowing more ${strategy.debt.symbol} as needed to maintain a good health factor.`}
          </Line>
          <Line>
            {`- Monitor the interest rate for borrowing ${strategy.debt.symbol} on ${strategy.debt.protocol}, and the yield for depositing ${strategy.yield.symbol} on ${strategy.yield.protocol}. Ensuring there is a positive arbitrage opportunity.`}
          </Line>
        </Section>
      </Popup>
    </>
  );
};

export default Strategy;
