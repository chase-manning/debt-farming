import styled from "styled-components";

import Footer from "./components/Footer";
import Main from "./components/Main";
import "./App.css";

const StyledApp = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
`;

const App = () => {
  return (
    <StyledApp>
      <Main />
      <Footer />
    </StyledApp>
  );
};

export default App;
