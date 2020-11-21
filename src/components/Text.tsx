import styled, { css } from 'styled-components'
import { Link } from 'react-router-dom'

export const A = styled(Link)`
  display: inline-block;
  font-weight: ${(props) => props.theme.font.weight.normal};
  text-decoration: none;
  color: ${(props) => props.theme.colors.text.primary};
  transition: 0.3s;

  &:hover {
    color: ${(p) => p.theme.colors.text.secondary};
  }
`

const genericTextStyles = (size: string) => css`
  margin: 0;
  font-weight: ${(props) => props.theme.font.weight.normal};
  font-size: ${size};
  color: ${(props) => props.theme.colors.text.primary};
`

export const P = styled.p`
  ${genericTextStyles('1rem')}
`

export const H1 = styled.h1`
  ${genericTextStyles('2.5rem')};
`

export const H2 = styled.h2`
  ${genericTextStyles('2rem')};
`

export const H3 = styled.h3`
  ${genericTextStyles('1.5rem')};
`

export const H4 = styled.h4`
  ${genericTextStyles('1rem')};
`

export const H5 = styled.h4`
  ${genericTextStyles('0.85rem')};
`
export const H6 = styled.h4`
  ${genericTextStyles('0.75rem')};
`
