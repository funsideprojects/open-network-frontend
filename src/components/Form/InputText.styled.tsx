import styled from 'styled-components'

// ? Base
export interface BaseInputProps {
  hasPrefix?: GenericSC
  hasSuffix?: GenericSC
  hasError?: boolean
}

export const BaseInput = styled.input<BaseInputProps>`
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

  ::placeholder {
    user-select: none;
  }
`

// ? Input container

export const InputContainer = styled.label`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;

  & > svg {
    cursor: pointer;
    width: 30px;
    height: 30px;
    position: absolute;
    top: 5px;
    padding: 3px;

    &.prefix-icon {
      left: 5px;
    }

    &.suffix-icon {
      right: 5px;
    }
  }
`

// ? Components for input type authControl

interface ACInputProps {
  Label: typeof ACInputLabel
  Underline: typeof ACInputUnderline
}

export const ACInputLabel = styled.span`
  user-select: none;
  position: absolute;
  top: 7px;
  font-family: ${(props) => props.theme.font.primary};
  font-size: ${(props) => props.theme.font.size.xs};
  color: ${(props) => props.theme.colors.grey[400]};
  transition: 0.3s;
`

export const ACInputUnderline = styled.span`
  width: 0;
  height: 2px;
  position: absolute;
  bottom: 0;
  left: 50%;
  border-radius: 100%;
  background: linear-gradient(to right, transparent, ${(props) => props.theme.colors.primary.dark}, transparent);
  transition: 0.3s;
`

export const ACInput = styled(BaseInput)<ACInputProps>`
  border: 0 solid ${(props) => props.theme.colors.border.main};
  border-bottom-width: 2px;
  background-color: transparent;

  ::placeholder {
    user-select: none;
    opacity: 0;
  }

  & ~ ${(props) => props.hasPrefix} {
    color: ${(props) => props.theme.colors[props.hasError ? 'error' : 'primary'].light};
    transition: 0.3s;
  }

  &:focus ~ ${(props) => props.hasPrefix} {
    color: ${(props) => props.theme.colors[props.hasError ? 'error' : 'primary'].main};
    transition: 0.3s;
  }

  & ~ ${(props) => props.Label} {
    left: ${(props) => props.theme.spacing[props.hasPrefix ? 'lg' : 'none']};
    opacity: ${(props) => (props.value ? 0 : 1)};
  }

  &:focus ~ ${(props) => props.Label} {
    top: -7px;
    color: ${(props) => props.theme.colors.primary.main};
    opacity: 1;
    transform: scale(0.8);
    transform-origin: top left;
  }

  &:focus ~ ${(props) => props.Underline} {
    width: 100%;
    left: 0;
  }
`
