import styled from "styled-components";

import Footer from "./components/Footer";
import HomePage from "./components/Main";

const StyledApp = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
`;

const App = () => {
  return (
    <StyledApp>
      <HomePage />
      <Footer />
    </StyledApp>
  );
};

export default App;
