import styled from "styled-components";
import useReserves from "../../contracts/reserves";
import useStrategies from "../../contracts/strategies";

const StyledHomePage = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  padding: 3rem;
  border: solid 1px orange;
`;

const Header = styled.div`
  width: 100%;
  font-size: 2.3rem;
`;

const HomePage = () => {
  const reserves = useReserves();
  const strategies = useStrategies();
  console.log(strategies);

  return (
    <StyledHomePage>
      {reserves.map((reserve) => (
        <Header>{reserve.liquidityRate}</Header>
      ))}
    </StyledHomePage>
  );
};

export default HomePage;
