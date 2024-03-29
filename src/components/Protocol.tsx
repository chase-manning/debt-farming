import styled from "styled-components";
import { useProtocol } from "../views/protocols";

const StyledProtocol = styled.div`
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
  protocol: string;
}

const Protocol = ({ protocol }: Props) => {
  const p = useProtocol(protocol);

  return (
    <StyledProtocol>
      {p && <Icon src={p?.logo} alt={`${p?.name} logo`} />}
      {p?.name || protocol}
    </StyledProtocol>
  );
};

export default Protocol;
