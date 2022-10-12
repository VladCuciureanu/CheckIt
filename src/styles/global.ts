import { createGlobalStyle } from "styled-components"
import { darkTheme, lightTheme } from "./theme"
import { cssVariables } from "./variables"
import cssReset from "./reset"

const GlobalStyle = createGlobalStyle`
  ${cssReset}

  :root {
    ${cssVariables}
    ${lightTheme}
  }

  [data-theme="dark"] {
    ${darkTheme}
  }

  * {
    -webkit-font-smoothing: antialiased;
  }

  body {
    color: rgb(var(--colors-highContrast));
    background-color: rgb(var(--colors-bg));
    transition: background var(--theme-transition), color var(--theme-transition);
    font-family: var(--fonts-body);
  }
`

export default GlobalStyle
