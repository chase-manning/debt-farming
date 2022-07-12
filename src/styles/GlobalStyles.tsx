import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    :root {
        --bg: #f3f3f3;
        --main: #221514;
        --sub: grey;
        --primary: #32B2E5;
        --error: red;
        --one: #F8EBD4;
        --two: #62E7FA;
        --three: #F39CD2;
    }

    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        font-size: 10px;
        color: var(--main);
    }

    button {
        background: none;
        border: none;
        outline: none;
    }
    
    input {
        border: none;
        outline: none;
    }

    a {
        text-decoration: none;
    }
`;

const GlobalStyles = (): JSX.Element => {
  return <GlobalStyle />;
};

export default GlobalStyles;
