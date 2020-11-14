import styled from 'styled-components'

// ? Container

export const ButtonContainer = styled.div<ButtonBaseProps>`
  width: ${(props) => (props.block ? '100%' : 'fit-content')};
  position: relative;
`

// ? Base

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
  min-width: 40px;
  min-height: 40px;
  display: inline-block;
  outline: none;
  border-width: ${(props) => (props.bordered ? '2px' : 0)};
  border-style: solid;
  border-radius: ${(props) => props.theme.radius.md};
  margin: 0;
  padding: ${(props) => props.theme.spacing.xs};
  font-weight: ${(props) => props.theme.font.weight.bold};
  font-size: 1rem;
  letter-spacing: 2px;
  transition: 0.3s;
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

export const ContentWrapper = styled.span`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`
