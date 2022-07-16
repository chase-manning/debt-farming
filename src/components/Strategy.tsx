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

interface Props {
  strategy: StrategyType;
}

const roundToDp = (value: number, dp: number) => {
  return Math.round(value * 10 ** dp) / 10 ** dp;
};

const formatPercent = (value: number) => {
  return `${roundToDp(value, 2)}%`;
};

const Strategy = ({ strategy }: Props) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <StyledStrategy>
        <Value>{formatPercent(strategy.netApy)}</Value>
        <Protocol protocol={strategy.collateral.protocol} />
        <Token symbol={strategy.debt.symbol} />
        <Protocol protocol={strategy.yield.protocol} />
        <Token symbol={strategy.yield.symbol} />
        <Button click={() => setOpen(true)}>Details</Button>
      </StyledStrategy>
      <Popup show={open} close={() => setOpen(false)}>
        meow
      </Popup>
    </>
  );
};

export default Strategy;
