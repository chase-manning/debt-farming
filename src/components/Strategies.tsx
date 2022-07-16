import { useState } from "react";
import styled from "styled-components";

import useStrategies, { StrategyType } from "../views/strategies";
import table from "../assets/details/table.svg";
import Strategy from "./Strategy";
import Token from "./Token";

interface PopupProps {
  show: boolean;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  transition: transform 1s ease-in-out;
  transform: ${({ show }: PopupProps) =>
    show ? "rotate(0)" : "rotate(-180deg)"};
  transform-origin: 50% calc(100% + (100vh - 700px) / 2);

  @media (max-width: 600px) {
    transform: none;
  }
`;

const TokenSelector = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 600px) {
    width: 100%;
    justify-content: space-between;
  }
`;

interface TokenOptionProps {
  active: boolean;
}

const TokenOption = styled.button`
  cursor: pointer;
  font-size: 1.6rem;
  padding: 1rem 2rem;
  margin: 0 1rem;
  background: ${(props: TokenOptionProps) =>
    props.active ? "none" : "var(--bg)"};

  border-bottom: solid 2px var(--main);
  border-right: solid 2px var(--main);
  border-left: solid
    ${(props: TokenOptionProps) => (props.active ? "2px" : "4px")} var(--main);
  border-top: solid
    ${(props: TokenOptionProps) => (props.active ? "2px" : "4px")} var(--main);
  border-radius: 0.5rem;

  @media (max-width: 600px) {
    margin: 0;
    padding: 0.5rem 1rem;
  }
`;

const StyledStrategies = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;

  @media (max-width: 600px) {
    background: var(--bg);
    border-radius: 1rem;
    width: 100%;
    margin-top: 3rem;
  }
`;

const Background = styled.img`
  height: 700px;

  @media (max-width: 600px) {
    display: none;
  }
`;

const Content = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 36px;
  padding-right: 80px;
  padding-left: 87px;
  padding-top: 72px;

  @media (max-width: 600px) {
    position: relative;
    padding: 1rem;
  }
`;

const Table = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

const Pages = styled.div`
  display: flex;
  align-items: center;
`;

const Previus = styled.button`
  background: var(--one);
  padding: 0.5rem 1rem;
  cursor: pointer;
`;

const Page = styled.div`
  padding: 0.5rem 1rem;
`;

const Next = styled.button`
  background: var(--two);
  padding: 0.5rem 1rem;
  cursor: pointer;
`;

const Headers = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 1rem;

  @media (max-width: 600px) {
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

const Header = styled.div`
  flex: 1;
  font-size: 1.8rem;
  font-family: "Poppins", sans-serif;
  font-weight: 800;

  @media (max-width: 600px) {
    font-size: 1.2rem;
  }
`;

const HeaderEnd = styled.div`
  height: 1rem;
  width: 100px;
`;

interface Props {
  token: string;
  setToken: (token: string) => void;
}

const Strategies = ({ token, setToken }: Props) => {
  const strategies = useStrategies(token);
  const [page, setPage] = useState(0);
  const [active, setActive] = useState<number | null>(null);

  const rowsPerPage = 13;
  const maxPages = Math.ceil(strategies.length / rowsPerPage);

  return (
    <Container show={active === null}>
      <TokenSelector>
        <TokenOption onClick={() => setToken("USDC")} active={token === "USDC"}>
          <Token symbol="USDC" />
        </TokenOption>
        <TokenOption onClick={() => setToken("ETH")} active={token === "ETH"}>
          <Token symbol="ETH" />
        </TokenOption>
        <TokenOption onClick={() => setToken("WBTC")} active={token === "WBTC"}>
          <Token symbol="WBTC" />
        </TokenOption>
      </TokenSelector>
      <StyledStrategies>
        <Background src={table} alt="Table background" />
        <Content>
          <Table>
            <Headers>
              <Header>Net APY</Header>
              <Header>Lending Protocol</Header>
              <Header>Debt Token</Header>
              <Header>Yield Protocol</Header>
              <Header>Yield Token</Header>
              <HeaderEnd />
            </Headers>
            {strategies
              .sort((a: StrategyType, b: StrategyType) => b.netApy - a.netApy)
              .slice(rowsPerPage * page, rowsPerPage * (page + 1))
              .map((strategy: StrategyType, index: number) => (
                <Strategy
                  mobileShowing={index === active}
                  strategy={strategy}
                  key={index}
                  showing={active === null ? false : index !== active}
                  setShowing={() => {
                    if (active === null) setActive(index);
                    else setActive(null);
                  }}
                />
              ))}
          </Table>
          <Pages>
            <Previus
              onClick={() => {
                if (page > 0) {
                  setPage(page - 1);
                }
              }}
            >
              Prev
            </Previus>
            <Page>{`${page + 1}/${maxPages}`}</Page>
            <Next
              onClick={() => {
                if (page < maxPages - 1) {
                  setPage(page + 1);
                }
              }}
            >
              Next
            </Next>
          </Pages>
        </Content>
      </StyledStrategies>
    </Container>
  );
};

export default Strategies;
