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
  isLoading?: boolean
}

export const ButtonBase = styled.button<ButtonBaseProps>`
  cursor: pointer;
  user-select: none;
  width: 100%;
  min-width: 40px;
  min-height: 40px;
  display: inline-block;
  outline: none;
  border-width: 2px;
  border-style: solid;
  border-color: ${(props) => (props.bordered ? props.theme.colors.primary.main : props.theme.colors.white)};
  border-radius: ${(props) => props.theme.radius.md};
  margin: 0;
  padding: calc(${(props) => props.theme.spacing.xs} - 2px);
  font-family: ${(props) => props.theme.font.secondary};
  font-weight: ${(props) => props.theme.font.weight.bold};
  font-size: 1rem;
  letter-spacing: 2px;
  transition: 0.3s;

  &:disabled {
    cursor: not-allowed;
    color: ${(props) => props.theme.colors.white} !important;
    background: ${(props) => props.theme.colors.grey[props.isLoading ? 200 : 400]} !important;
  }

  &:focus {
    box-shadow: 0 0 0 2px ${(props) => props.theme.colors.primary.light};
  }
`

export const ButtonDefault = styled(ButtonBase)`
  color: ${(props) => props.theme.colors.primary.main};
  background: ${(props) => props.theme.colors.white};

  &:hover {
    background: ${(props) => props.theme.colors.primary.lighter};
  }
`

export const ButtonPrimary = styled(ButtonBase)`
  color: ${(props) => props.theme.colors.white};
  background: ${(props) => props.theme.colors.primary.main};

  &:hover {
    background: ${(props) => props.theme.colors.primary.light};
  }
`

export const ButtonText = styled(ButtonBase)`
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
