import styled from 'styled-components'

export const Nav = styled.nav`
  width: 100%;
  display: flex;
  justify-content: space-evenly;

  button {
    padding-right: ${(props) => props.theme.spacing.xs};
    padding-left: ${(props) => props.theme.spacing.xs};
    font-size: 0.7rem;
  }

  @media only screen and (min-width: ${(props) => props.theme.screen.lg}) {
    button {
      padding-right: ${(props) => props.theme.spacing.sm};
      padding-left: ${(props) => props.theme.spacing.sm};
    }
  }

  @media only screen and (min-width: ${(props) => props.theme.screen.xl}) {
    button {
      padding-right: ${(props) => props.theme.spacing.lg};
      padding-left: ${(props) => props.theme.spacing.lg};
      font-size: 1rem;
    }
  }
`