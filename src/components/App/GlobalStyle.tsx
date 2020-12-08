import { createGlobalStyle, css } from 'styled-components'
import { StyledIconBase } from '@styled-icons/styled-icon'

const Scroll = css`
  /* Width */
  ::-webkit-scrollbar {
    width: 5px;
    height: 8px;
    background: ${(props) => props.theme.colors.grey[200]} !important;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    border-radius: 10px;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    height: 3px;
    border-radius: 10px;
    background: ${(props) => props.theme.colors.grey[500]};
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: ${(props) => props.theme.colors.grey[400]};
  }
`

/** Global styles for the application */
export default createGlobalStyle`
  ${Scroll}

  html {
    overflow-x: hidden;
  }

  html, body {
    width: 100%;
    height: 100%;
    scroll-behavior: smooth;
  }

  *,
  *:before,
  *:after {
    box-sizing: border-box;
  }

  body {
    direction: ltr;
    margin: 0;
    padding: 0;
    font-family: ${(props) => props.theme.font.primary};
    font-variant-numeric: tabular-nums;
    font-feature-settings: "tnum";
    font-size: ${(props) => props.theme.font.size.sm};
    color: ${(props) => props.theme.colors.text.primary};
    background-color: ${(props) => props.theme.colors.white};

    &[class^="no-scroll"] {
      overflow: hidden;
    }

    ${StyledIconBase} {
      user-select: none;
      width: 20px;
      height: 20px;
    }
  }

  a {
    font-family: ${(props) => props.theme.font.primary};
    text-decoration: none;
    color: inherit;
  }

  #app-mountpoint {
    height: 100%;
    position: relative;
  }

`
