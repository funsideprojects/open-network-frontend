import { createGlobalStyle, css } from 'styled-components'

import theme from 'theme'

const Scroll = css`
  // ? Width
  ::-webkit-scrollbar {
    width: 4px;
    height: 8px;
    background: transparent !important;
  }

  // ? Track
  ::-webkit-scrollbar-track {
    border-radius: 10px;
  }

  // ? Handle
  ::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 10px;
    height: 3px;
  }

  // ? Handle on hover
  ::-webkit-scrollbar-thumb:hover {
    background: #ccc;
  }
`

/** Global styles for the application */
export default createGlobalStyle`
  ${Scroll}

  html {
    height: 100%;
    box-sizing: border-box;
  }

  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }

  body {
    font-family: ${theme.font.family};
    color: ${theme.colors.text.primary};
    background-color: ${theme.colors.body};
    direction: ltr;
    margin: 0;
    padding: 0;
  }

  #app-mountpoint {
    position: relative;
  }
`
