import styled, { keyframes } from 'styled-components'

import theme from 'theme'

const dotFlashing = keyframes`
  0% {
    background-color: ${theme.colors.primary.light};
  }
  100% {
    background-color: #fff;
  }
`

export const DotFlashing = styled.div`
  width: 4px;
  height: 4px;
  position: relative;
  border-radius: 5px;
  margin: 2px 8px;
  animation: ${dotFlashing} 0.9s infinite linear alternate;
  animation-delay: 0.45s;

  &::before,
  &::after {
    content: '';
    width: 4px;
    height: 4px;
    position: absolute;
    top: 0;
    display: inline-block;
    border-radius: 5px;
    animation: ${dotFlashing} 0.9s infinite alternate;
  }

  &::before {
    left: -6px;
    animation-delay: 0s;
  }

  &::after {
    left: 6px;
    animation-delay: 0.9s;
  }
`
