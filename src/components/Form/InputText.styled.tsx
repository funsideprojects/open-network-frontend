import styled from 'styled-components'

// ? Input container

export const InputContainer = styled.label`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  color: ${(props) => props.theme.colors.primary.main};

  > svg {
    width: 30px !important;
    height: 30px !important;
    position: absolute;
    top: 5px;
    padding: 3px;
    transition: 0.8s;

    &.prefix-icon {
      left: 5px;
    }

    &.suffix-icon {
      right: 5px;
    }
  }
`

// ? Base

export interface InputBaseProps {
  // small?: boolean
  hasPrefix?: GenericSC
  hasSuffix?: GenericSC
  hasError?: string
}

export const InputBase = styled.input<InputBaseProps>`
  width: 100%;
  height: 40px;
  outline: none;
  padding: ${(props) =>
    `${props.theme.spacing.xxs} ` +
    `${props.theme.spacing[props.hasSuffix ? 'lg' : 'none']} ` +
    `${props.theme.spacing.xxs} ` +
    `${props.theme.spacing[props.hasPrefix ? 'lg' : 'none']}`};
  font-family: ${(props) => props.theme.font.primary};
  font-size: ${(props) => props.theme.font.size.xs};
  letter-spacing: 1.5px;
`

// ? Components for input type animated label

interface ALInputProps {
  Label: typeof ALInputLabel
  Underline: typeof ALInputUnderline
}

export const ALInputLabel = styled.span`
  cursor: text;
  user-select: none;
  pointer-events: none;
  position: absolute;
  top: 12px;
  font-family: ${(props) => props.theme.font.primary};
  font-size: ${(props) => props.theme.font.size.xs};
  color: ${(props) => props.theme.colors.grey[400]};
  transition: 0.3s;
`

export const ALInputUnderline = styled.span`
  width: 0;
  height: 2px;
  position: absolute;
  bottom: 0;
  left: 50%;
  border-radius: 100%;
  background: linear-gradient(to right, transparent, ${(props) => props.theme.colors.primary.dark}, transparent);
  transition: 0.3s;
`

export const ALInput = styled(InputBase)<ALInputProps>`
  border: 0 solid ${(props) => props.theme.colors.primary.grey};
  border-bottom-width: 2px;
  background-color: transparent;

  ::placeholder {
    user-select: none;
    opacity: 0;
  }

  &:-webkit-autofill {
    box-shadow: 0 0 0 40px inset white;
  }

  &:-webkit-autofill ~ ${(props) => props.Label} {
    left: ${(props) => props.theme.spacing[props.hasPrefix ? 'lg' : 'none']};
    opacity: 0;
    transform-origin: top left;
  }

  & ~ ${(props) => props.hasPrefix} {
    color: ${(props) => props.theme.colors[props.hasError ? 'danger' : 'primary'].light};
    transition: 0.3s;
  }

  & ~ ${(props) => props.Label} {
    left: ${(props) => props.theme.spacing[props.hasPrefix ? 'lg' : 'none']};
    opacity: 0;
    transform-origin: top left;
  }

  &:placeholder-shown ~ ${(props) => props.Label} {
    opacity: 1;
  }

  &:focus ~ ${(props) => props.hasPrefix} {
    color: ${(props) => props.theme.colors[props.hasError ? 'danger' : 'primary'].main};
    transition: 0.3s;
  }

  &:focus ~ ${(props) => props.Label} {
    top: -7px;
    color: ${(props) => props.theme.colors.primary.main};
    opacity: 1;
    transform: scale(0.8);
  }

  &:focus ~ ${(props) => props.Underline} {
    width: 100%;
    left: 0;
  }
`

// ? Primary

interface InputPrimaryProps {
  messageElement: GenericSC
}

export const InputPrimary = styled(InputBase)<InputPrimaryProps>`
  border: 2px solid ${(props) => props.theme.colors.white};
  border-radius: ${(props) => props.theme.radius.md};
  padding: ${(props) =>
    `calc(${props.theme.spacing.xxs} - 2px) ` +
    `calc(${props.theme.spacing[props.hasSuffix ? 'lg' : 'sm']} - 2px) ` +
    `calc(${props.theme.spacing.xxs} - 2px) ` +
    `calc(${props.theme.spacing[props.hasPrefix ? 'lg' : 'sm']} - 2px)`};
  background: ${(props) => props.theme.colors[props.hasError ? 'danger' : 'primary'].lighter};
  transition: 0.3s;

  ::placeholder {
    user-select: none;
  }

  &:focus {
    box-shadow: 0 0 0 2px ${(props) => props.theme.colors.primary.light};
  }

  &:disabled {
    background: ${(props) => props.theme.colors.primary.grey};
  }

  &:enabled {
    &:not(:focus):hover {
      color: ${(props) => props.theme.colors.white};
      background: ${(props) => props.theme.colors[props.hasError ? 'danger' : 'primary'].light};

      ::placeholder {
        color: ${(props) => props.theme.colors.white};
      }

      & ~ ${(props) => props.hasPrefix} {
        color: ${(props) => props.theme.colors.white};
        transition: 0.3s;
      }

      & ~ ${(props) => props.hasSuffix} {
        color: ${(props) => props.theme.colors.white};
        transition: 0.3s;
      }
    }

    & ~ ${(props) => props.hasSuffix} {
      color: ${(props) => props.theme.colors[props.hasError ? 'danger' : 'primary'].dark};
      transition: 0.3s;
    }
  }
`

// ? Error Message

export const ErrorMessage = styled.span`
  user-select: none;
  width: 100%;
  padding: 0 ${(props) => props.theme.spacing.xxs};
  font-size: ${(props) => props.theme.font.size.xxs};
  word-break: break-word;
  box-decoration-break: clone;
  color: ${(props) => props.theme.colors.danger.dark};
`
