import styled from 'styled-components'
import { LeftArrowAlt, RightArrowAlt } from '@styled-icons/boxicons-regular'

export const Nav = styled.nav`
  width: 100%;
  display: flex;
  justify-content: space-evenly;

  button {
    padding: 0 ${(props) => props.theme.spacing.xs};
    font-size: 0.7rem;
  }

  @media only screen and (min-width: ${(props) => props.theme.screen.lg}) {
    button {
      padding: 0 ${(props) => props.theme.spacing.sm};
    }
  }

  @media only screen and (min-width: ${(props) => props.theme.screen.xl}) {
    button {
      padding: 0 ${(props) => props.theme.spacing.lg};
      font-size: 1rem;
    }
  }
`

export const SCILeftArrowAlt = styled(LeftArrowAlt)``
export const SCIRightArrowAlt = styled(RightArrowAlt)``
