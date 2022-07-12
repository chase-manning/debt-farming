import styled from "styled-components";
import useProtocols, { ProtocolType } from "../views/protocols";

const StyledProtocol = styled.div`
  flex: 1;
  font-size: 1.6rem;
  font-family: "Poppins", sans-serif;
  font-weight: 600;
`;

interface Props {
  protocol: string;
}

const Protocol = ({ protocol }: Props) => {
  const protocols = useProtocols();

  return (
    <StyledProtocol>
      {protocols.find((p: ProtocolType) => p.id === protocol)?.name || "---"}
    </StyledProtocol>
  );
};

export default Protocol;
