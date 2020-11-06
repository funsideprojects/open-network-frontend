import styled from 'styled-components'

// ? Base Button

export interface BaseButtonProps {
  buttonType?: 'default' | 'primary' | 'text'
  block?: boolean
  bordered?: boolean
  danger?: boolean
}

export const BaseButton = styled.button<BaseButtonProps>`
  cursor: pointer;
  user-select: none;
  width: ${(props) => (props.block ? '100%' : 'fit-content')};
  min-width: 40px;
  height: 40px;
  max-height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  outline: none;
  border: 0;
  border-width: ${(props) => (props.bordered ? '2px' : 0)};
  border-style: solid;
  border-color: ${(props) => props.theme.colors.primary.main};
  border-radius: 20px;
  margin: 0;
  padding: 0;
  font-family: ${(props) => props.theme.font.primary};
  font-size: ${(props) => props.theme.font.size.xs};
  letter-spacing: 3px;
  color: ${(props) => (props.buttonType === 'primary' ? props.theme.colors.white : props.theme.colors.primary.main)};
  background: ${(props) => props.theme.colors.none};
  transition: 0.2s;

  &:before,
  &:after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    border-radius: 20px;
    z-index: -1;
    transition: clip-path 0.5s;
  }

  &:before {
    background: ${(props) =>
      props.buttonType === 'primary'
        ? props.theme.colors.primary.main
        : props.theme.colors[props.buttonType === 'default' ? 'white' : 'none']};
  }

  &:after {
    clip-path: circle(0% at 100% 100%);
    background: ${(props) =>
      props.buttonType === 'primary' ? props.theme.colors.primary.light : props.theme.colors.grey[100]};
  }

  &:hover {
    color: ${(props) => (props.buttonType === 'primary' ? props.theme.colors.white : props.theme.colors.primary.light)};

    &:after {
      clip-path: circle(150% at 100% 100%);
      transition: clip-path 0.5s;
    }
  }
`

// ? Container

export const ButtonContainer = styled.div<BaseButtonProps>`
  width: ${(props) => (props.block ? '100%' : 'fit-content')};
  height: 40px;
  position: relative;
`

// ? Form submit-button

export const ButtonSubmitLabel = styled.label`
  cursor: pointer;
  user-select: none;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  outline: none;
  border: 0;
  border-radius: 20px;
  font-family: ${(props) => props.theme.font.primary};
  font-size: ${(props) => props.theme.font.size.xs};
  letter-spacing: 3px;
  color: ${(props) => props.theme.colors.white};
  transition: 0.2s;

  &:before,
  &:after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    border-radius: 20px;
    z-index: -1;
    transition: clip-path 0.5s;
  }

  &:before {
    background: ${(props) => props.theme.colors.primary.main};
  }

  &:after {
    clip-path: circle(0% at 100% 100%);
    background: ${(props) => props.theme.colors.primary.light};
  }

  &:hover {
    transition: 0.2s;

    &:after {
      clip-path: circle(150% at 100% 100%);
      transition: clip-path 0.5s;
    }
  }
`

export const ButtonSubmit = styled.input.attrs((props) => ({
  type: 'submit',
}))`
  display: none;
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
