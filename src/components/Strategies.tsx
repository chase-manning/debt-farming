import { useState } from "react";
import styled from "styled-components";
import useStrategies, { StrategyType } from "../views/strategies";
import table from "../assets/details/table.svg";
import Strategy from "./Strategy";

const StyledStrategies = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;

const Background = styled.img`
  height: 700px;
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
`;

const Header = styled.div`
  flex: 1;
  font-size: 1.8rem;
  font-family: "Poppins", sans-serif;
  font-weight: 800;
`;

const HeaderEnd = styled.div`
  height: 1rem;
  width: 100px;
`;

interface Props {
  token: string;
}

const Strategies = ({ token }: Props) => {
  const strategies = useStrategies(token);
  const [page, setPage] = useState(0);

  const rowsPerPage = 13;
  const maxPages = Math.ceil(strategies.length / rowsPerPage);

  return (
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
              <Strategy strategy={strategy} key={index} />
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
  );
};

export default Strategies;
