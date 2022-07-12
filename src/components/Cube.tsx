import { useState } from "react";
import styled from "styled-components";
import { Link } from "react-scroll";

import cube from "../assets/hero/cube.svg";
import usdc from "../assets/tokens/usdc.svg";
import eth from "../assets/tokens/eth.svg";
import wbtc from "../assets/tokens/btc.svg";

const Container = styled.div`
  transition: all 1s ease-out;
`;

interface CubeProps {
  position: number;
}

const StyledCube = styled.div`
  display: flex;
  height: 30vh;
  position: absolute;
  top: 0;
  right: 0;
  transform: translate(
    calc(${(props: CubeProps) => 0 - props.position * 50}%),
    -33%
  );
`;

const Asset = styled.img`
  height: 100%;
`;

const Face = styled.button`
  position: absolute;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-evenly;
  cursor: pointer;

  bottom: 2px;
  left: 2px;
  height: 41.5%;
  width: 34.8%;
  /* background: linear-gradient(-45deg, #efa8d7, #f9f2d7); */
`;

const TokenContainer = styled.div`
  display: flex;
  align-items: center;
`;

const TokenIcon = styled.img`
  height: 2vh;
  margin-right: 0.4rem;
`;

const TokenSymbol = styled.div`
  font-size: 1.6vh;
  font-family: "Poppins", sans-serif;
  font-weight: 500;
`;

const ApyContainer = styled.div`
  display: flex;
  align-items: flex-end;
`;

const Apy = styled.div`
  font-size: 6vh;
  font-family: "Poppins", sans-serif;
  font-weight: 600;
`;

const Percent = styled.div`
  font-size: 1.8vh;
  font-family: "Poppins", sans-serif;
  font-weight: 600;
`;

const Label = styled.div`
  font-size: 1.6vh;
  font-family: "Poppins", sans-serif;
  font-weight: 500;
`;

interface Props {
  position: number;
  apy: number;
  show: boolean;
  token: string;
  setToken: (token: string) => void;
}

const Cube = ({ position, apy, show, token, setToken }: Props) => {
  const [isHover, setIsHover] = useState(false);

  const transform = () => {
    const base = show ? 0 : 210;
    const hover = isHover ? 20 : 0;
    return base + hover;
  };

  return (
    <Link
      to="details-scroll"
      spy
      smooth
      duration={1000}
      onClick={() => setToken(token)}
    >
      <Container
        style={{ transform: `translate(${transform()}px, -${transform()}px)` }}
      >
        <StyledCube position={position}>
          <Asset src={cube} alt="Decorative cube" />
          <Face
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
          >
            <TokenContainer>
              <TokenIcon
                src={token === "USDC" ? usdc : token === "ETH" ? eth : wbtc}
                alt={`${token} token`}
              />
              <TokenSymbol>{token}</TokenSymbol>
            </TokenContainer>
            <ApyContainer>
              <Apy>{apy}</Apy>
              <Percent>%</Percent>
            </ApyContainer>
            <Label>APY</Label>
          </Face>
        </StyledCube>
      </Container>
    </Link>
  );
};

export default Cube;
