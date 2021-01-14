import styled from 'styled-components'

// ? Base

export interface ButtonBaseProps {
  buttonType?: 'default' | 'primary' | 'text' | 'danger'
  block?: boolean
  round?: boolean
  isLoading?: boolean
}

export const ButtonBase = styled.button<ButtonBaseProps>`
  cursor: pointer;
  user-select: none;
  width: ${(props) => (props.block ? '100%' : 'fit-content')};
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  outline: none;
  border: 0;
  border-radius: ${(props) => props.theme.radius[props.round ? 'round' : 'md']};
  margin: 0;
  padding: ${(props) => props.theme.spacing[props.round ? 'none' : 'xs']};
  font-family: ${(props) => props.theme.font.secondary};
  font-weight: ${(props) => props.theme.font.weight.bold};
  font-size: 1rem;
  letter-spacing: 2px;
  transition: 0.3s;

  &:disabled {
    cursor: not-allowed;
    pointer-events: none;
    color: ${(props) => props.theme.colors.white} !important;
    background: ${(props) => props.theme.colors.grey[props.isLoading ? 200 : 400]} !important;
  }
`

export const ButtonDefault = styled(ButtonBase)`
  color: ${(props) => props.theme.colors.primary.main};
  background: ${(props) => props.theme.colors.white};

  &:hover {
    color: ${(props) => props.theme.colors.primary.main};
    background: ${(props) => props.theme.colors.primary.lighter};
  }
`

export const ButtonPrimary = styled(ButtonBase)`
  color: ${(props) => props.theme.colors.white};
  background: ${(props) => props.theme.colors.primary.main};

  &:hover {
    color: ${(props) => props.theme.colors.white};
    background: ${(props) => props.theme.colors.primary.light};
  }
`

export const ButtonText = styled(ButtonBase)`
  color: ${(props) => props.theme.colors.primary.main};
  background: ${(props) => props.theme.colors.none};

  &:hover {
    color: ${(props) => props.theme.colors.primary.main};
    background: ${(props) => props.theme.colors.primary.grey};
  }
`

export const ButtonDanger = styled(ButtonBase)`
  color: ${(props) => props.theme.colors.white};
  background: ${(props) => props.theme.colors.danger.main};

  &:hover {
    color: ${(props) => props.theme.colors.white};
    background: ${(props) => props.theme.colors.danger.light};
  }
`
export const ContentWrapper = styled.span`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`
