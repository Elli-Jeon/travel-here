import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
  ${reset}

  html, body {
    height : 100%;
  }

  #root {
    height : 100%;
    position: absolute;
    left: 0;
    width: 100%;
    overflow: hidden;
  }

  * {
      box-sizing : border-box;
  }

  a {
    text-decoration : none;
  }

`;

export default GlobalStyle;
