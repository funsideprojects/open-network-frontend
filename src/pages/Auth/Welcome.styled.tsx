import styled from 'styled-components'

export const Section = styled.section`
  width: 45%;
  max-width: 40%;
  position: absolute;
  top: 40px;
  left: 0;
  display: flex;
  flex-direction: column;

  box-shadow: ${(props) => props.theme.shadows.sm};
  border-top-right-radius: ${(props) => props.theme.radius.lg};
  border-bottom-right-radius: ${(props) => props.theme.radius.lg};
  padding: ${(props) => props.theme.spacing.xxl};
  background: ${(props) => props.theme.colors.white};
`

export const Title = styled.h1`
  margin-top: 0;
  font-weight: ${(props) => props.theme.font.weight.extra};
  font-size: ${(props) => props.theme.font.size.xxl};
`

export const PrimaryText = styled.span`
  color: ${(props) => props.theme.colors.primary.main};
`

export const IntroParagraphs = styled.p`
  margin-bottom: ${(props) => props.theme.spacing.lg};
  font-family: ${(props) => props.theme.font.secondary};
  font-size: ${(props) => props.theme.font.size.sm};
  letter-spacing: ${(props) => props.theme.font.spacing.letter.md};
  color: ${(props) => props.theme.colors.grey[500]};
`

export const Nav = styled.nav`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
`
