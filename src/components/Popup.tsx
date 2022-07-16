import { ReactNode } from "react";
import styled from "styled-components";
import exit from "../assets/ui/exit.svg";
import Button from "./Button";

import popup from "../assets/details/popup.svg";

interface PopupProps {
  show: boolean;
}

const Container = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transition: transform 1s ease-in-out;
  transform: translate(-50%, -50%)
    ${({ show }: PopupProps) => (show ? "rotate(0)" : "rotate(-180deg)")};
  transform-origin: 50% calc(100% + (100vh - 800px) / 2);
`;

const Background = styled.img`
  height: 800px;
`;

const ContentContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  padding-top: 5.2rem;
  padding-right: 5.2rem;
  padding-bottom: 2.3rem;
  padding-left: 7.9rem;
  width: 100%;
  height: 100%;
`;

const Area = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  padding: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ExitButton = styled.button`
  position: absolute;
  top: 3rem;
  right: 3rem;
  cursor: pointer;
`;

const Exit = styled.img`
  height: 2rem;
`;

const Header = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const SubHeader = styled.div`
  font-size: 1.8rem;
  margin-bottom: 1rem;
  color: var(--sub);
`;

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

interface Props {
  show: boolean;
  close: () => void;
  header?: string;
  subHeader?: string;
  buttonText?: string;
  buttonAction?: () => void;
  children?: ReactNode;
}

const Popup = ({
  show,
  close,
  header,
  subHeader,
  buttonText,
  buttonAction,
  children,
}: Props) => {
  return (
    <Container show={show}>
      <Background src={popup} alt="Popup background" />
      <ContentContainer>
        <Area>
          <ExitButton onClick={() => close()}>
            <Exit src={exit} />
          </ExitButton>
          {header && <Header>{header}</Header>}
          {subHeader && <SubHeader>{subHeader}</SubHeader>}
          {children && <Content>{children}</Content>}
          {buttonText && buttonAction && (
            <Button primary click={buttonAction}>
              {buttonText}
            </Button>
          )}
        </Area>
      </ContentContainer>
    </Container>
  );
};

export default Popup;
