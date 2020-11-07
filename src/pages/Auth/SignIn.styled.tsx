import styled from 'styled-components'
import { LeftArrowAlt, RightArrowAlt } from '@styled-icons/boxicons-regular'
import { User, UserCheck, UserX, Key } from '@styled-icons/feather'

export const Drawer = styled.section`
  min-width: 40%;
  max-width: 40%;
  height: 100%;
  max-height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  position: absolute;
  top: 0;
  display: flex;
  flex-direction: column;
  box-shadow: ${(props) => props.theme.shadows.sm};
  padding: ${(props) => props.theme.spacing.xxl};
  background: ${(props) => props.theme.colors.white};
`

export const SCILeftArrowAlt = styled(LeftArrowAlt)`
  width: 30px;
  height: 30px;
`

export const Title = styled.h1`
  margin: ${(props) => props.theme.spacing.lg} 0;
  font-weight: ${(props) => props.theme.font.weight.extra};
  font-size: ${(props) => props.theme.font.size.xl};
`

export const PrimaryText = styled.span`
  ${(props) =>
    typeof props.onClick === 'function'
      ? `
cursor: pointer;
user-select: none;
font-weight: ${props.theme.font.weight.semi};
`
      : ''}
  color: ${(props) => props.theme.colors.primary.main};
`

export const SCIUser = styled(User)``
export const SCIUserCheck = styled(UserCheck)``
export const SCIUserX = styled(UserX)``
export const SCIKey = styled(Key)``

export const SCIRightArrowAlt = styled(RightArrowAlt)`
  width: 20px;
  height: 20px;
`

export const AuthHint = styled.p`
  margin: 0;
  font-size: ${(props) => props.theme.font.size.xxs};
  text-align: right;
`
