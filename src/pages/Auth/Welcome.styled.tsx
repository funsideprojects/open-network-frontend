import styled from 'styled-components'
import { LeftArrowAlt, RightArrowAlt } from '@styled-icons/boxicons-regular'

import { Title as GenericTitle } from './Generic.styled'

export const Title = styled(GenericTitle)`
  margin-top: 0;
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
