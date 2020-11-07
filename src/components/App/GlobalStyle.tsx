import { createGlobalStyle, css } from 'styled-components'

import theme from 'theme'

const Scroll = css`
  /* ? Width */
  ::-webkit-scrollbar {
    width: 4px;
    height: 8px;
    background: transparent !important;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    border-radius: 10px;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    height: 3px;
    border-radius: 10px;
    background: ${(props) => props.theme.colors.grey[300]};
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: ${(props) => props.theme.colors.grey[300]};
  }
`

/** Global styles for the application */
export default createGlobalStyle`
  ${Scroll}

  html, body {
    width: 100%;
    height: 100%;
  }

  *,
  *:before,
  *:after {
    box-sizing: border-box;
  }

  body {
    direction: ltr;
    overflow-x: hidden;
    margin: 0;
    padding: 0;
    font-family: ${theme.font.primary};
    color: ${theme.colors.text.primary};
    background-color: ${theme.colors.body};
  }

  #app-mountpoint {
    height: 100%;
    position: relative;
  }
`
