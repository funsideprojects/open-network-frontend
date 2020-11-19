import styled from 'styled-components'

export const Title = styled.h2`
  margin: 0;
  text-align: center;
`

export const Paragraph = styled.p`
  margin: 0;
  font-size: 0.9rem;
  letter-spacing: -0.05rem;
  text-align: center;
`

export const Footer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin: ${(props) => props.theme.spacing.md} 0 0 0;

  button {
    background: ${(props) => props.theme.colors.success.main};

    &:hover {
      background: ${(props) => props.theme.colors.success.light};
    }
  }
`
