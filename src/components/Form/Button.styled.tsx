import styled from 'styled-components'

// ? Container

export const ButtonContainer = styled.div<ButtonBaseProps>`
  width: ${(props) => (props.block ? '100%' : 'fit-content')};
  min-width: 40px;
  height: 40px;
  max-height: 40px;
  position: relative;
`

// ?

export interface ButtonBaseProps {
  buttonType?: 'default' | 'primary' | 'text'
  block?: boolean
  bordered?: boolean
  danger?: boolean
}

export const ButtonBase = styled.button<ButtonBaseProps>`
  cursor: pointer;
  user-select: none;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  outline: none;
  border-width: ${(props) => (props.bordered ? '2px' : 0)};
  border-style: solid;
  border-radius: ${(props) => props.theme.radius.md};
  margin: 0;
  padding: 0 ${(props) => props.theme.spacing.xs};
  font-family: ${(props) => props.theme.font.primary};
  font-weight: ${(props) => props.theme.font.weight.semi};
  font-size: ${(props) => props.theme.font.size.xxs};
  letter-spacing: 2px;
  transition: 0.2s;
`

export const ButtonDefault = styled(ButtonBase)`
  border-color: ${(props) => props.theme.colors.primary.main};
  color: ${(props) => props.theme.colors.primary.main};
  background: ${(props) => props.theme.colors.white};

  &:hover {
    background: ${(props) => props.theme.colors.primary.lighter};
  }
`

export const ButtonPrimary = styled(ButtonBase)`
  border-color: ${(props) => props.theme.colors.white};
  color: ${(props) => props.theme.colors.white};
  background: ${(props) => props.theme.colors.primary.main};

  &:hover {
    background: ${(props) => props.theme.colors.primary.light};
  }
`

export const ButtonText = styled(ButtonBase)`
  border-color: ${(props) => props.theme.colors.primary.main};
  color: ${(props) => props.theme.colors.primary.main};
  background: ${(props) => props.theme.colors.none};

  &:hover {
    background: ${(props) => props.theme.colors.primary.grey};
  }
`

export const ButtonIconContainer = styled.span`
  width: 32px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  font-size: 22px;
  background: transparent;

  & > svg {
    width: 100%;
    height: 100%;
  }
`
