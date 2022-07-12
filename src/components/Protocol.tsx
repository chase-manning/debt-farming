import styled from "styled-components";
import useProtocols from "../views/protocols";

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
  const protocols = useProtocols();

  const p = protocols.find((p) => p.id === protocol);

  return (
    <StyledProtocol>
      {p && <Icon src={p?.logo} alt={`${p?.name} logo`} />}
      {p?.name || "---"}
    </StyledProtocol>
  );
};

export default Protocol;
