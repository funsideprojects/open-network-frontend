import styled from 'styled-components'
import { LeftArrowAlt, RightArrowAlt } from '@styled-icons/boxicons-regular'

import { Drawer as GenericDrawer, Title as GenericTitle } from './Generic.styled'

export const Drawer = styled(GenericDrawer)`
  width: 40%;
  top: 40px;
  border-top-right-radius: ${(props) => props.theme.radius.lg};
  border-bottom-right-radius: ${(props) => props.theme.radius.lg};
`

export const Title = styled(GenericTitle)`
  margin-top: 0;
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

  & button {
    padding: 0 ${(props) => props.theme.spacing.lg};
  }
`

export const SCILeftArrowAlt = styled(LeftArrowAlt)`
  width: 20px;
  height: 20px;
`
export const SCIRightArrowAlt = styled(RightArrowAlt)`
  width: 20px;
  height: 20px;
`
