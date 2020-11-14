import styled, { DefaultTheme } from 'styled-components'

interface FormItemProps {
  top?: keyof DefaultTheme['spacing']
  right?: keyof DefaultTheme['spacing']
  bottom?: keyof DefaultTheme['spacing']
  left?: keyof DefaultTheme['spacing']
}

export const Form = styled.form`
  width: 100%;
  position: relative;
`
export const FormItem = styled.div<FormItemProps>`
  width: 100%;
  margin-top: ${(props) => props.theme.spacing.xs};
  margin-bottom: ${(props) => props.theme.spacing.xs};
  ${(props) => props.top && `margin-top: ${props.theme.spacing[props.top]}`};
  ${(props) => props.right && `margin-right: ${props.theme.spacing[props.right]}`};
  ${(props) => props.bottom && `margin-bottom: ${props.theme.spacing[props.bottom]}`};
  ${(props) => props.left && `margin-left: ${props.theme.spacing[props.left]}`};
`
