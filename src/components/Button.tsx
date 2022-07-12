import { ReactNode } from "react";
import styled from "styled-components";

interface ButtonProps {
  primary?: boolean;
}

const StyledButton = styled.button`
  padding: 1rem 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: ${(props: ButtonProps) =>
    props.primary ? "var(--primary)" : "var(--bg)"};
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  font-size: 1.6rem;
  border-radius: 0.5rem;

  :disabled {
    cursor: auto;
    background-color: var(--sub);
  }

  background: linear-gradient(-45deg, var(--three), var(--one));
`;

interface Props {
  click: () => void;
  primary?: boolean;
  disabled?: boolean;
  loading?: boolean;
  children?: ReactNode;
}

const Button = ({ children, click, primary, disabled, loading }: Props) => {
  return (
    <StyledButton
      onClick={() => click()}
      disabled={disabled || loading}
      primary={primary}
    >
      {children}
    </StyledButton>
  );
};

export default Button;
