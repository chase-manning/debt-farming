import styled from "styled-components";
import useTokens from "../views/tokens";

const StyledToken = styled.div`
  flex: 1;
  font-size: 1.6rem;
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  display: flex;
  align-items: center;
`;

const Icon = styled.img`
  height: 2.2rem;
  margin-right: 0.6rem;
  border-radius: 50%;
`;

interface Props {
  symbol: string;
}

const Token = ({ symbol }: Props) => {
  const tokens = useTokens();

  const token = tokens.find(
    (p) => p.symbol.toLowerCase() === symbol.toLowerCase()
  );

  return (
    <StyledToken>
      {token && <Icon src={token?.url} alt={`${token?.symbol} logo`} />}
      {token?.symbol || symbol}
    </StyledToken>
  );
};

export default Token;
