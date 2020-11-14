import styled from 'styled-components'

// ? Container

export const CheckboxContainer = styled.label``

// ? Checkbox

export interface CheckboxProps {
  Label: GenericSC
}

export const CheckboxComponent = styled.input.attrs<CheckboxProps>(() => ({
  type: 'checkbox',
}))<CheckboxProps>`
  width: 20px;
  height: 20px;
  position: absolute;
  opacity: 0;
  z-index: -1;

  &:checked + ${/* sc-selector */ (props) => props.Label}::before {
    background: ${(props) => props.theme.colors.primary.main};
  }

  &:checked + ${/* sc-selector */ (props) => props.Label}::after {
    transform: rotate(0) scale(1);
  }
`

export const CheckboxLabel = styled.span`
  cursor: pointer;
  user-select: none;
  height: 20px;
  position: relative;
  display: inline-block;
  padding: 0 0 0 30px;
  font-size: ${(props) => props.theme.font.size.xs};
  line-height: 20px;

  &::before,
  &::after {
    width: 20px;
    height: 20px;
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    transition: 0.2s;
  }

  &::before {
    content: ' ';
    border: 2px solid ${(props) => props.theme.colors.primary.main};
    border-radius: ${(props) => props.theme.radius.sm};
  }

  &::after {
    content: '\\2714';
    border-radius: ${(props) => props.theme.radius.sm};
    line-height: 20px;
    text-align: center;
    color: ${(props) => props.theme.colors.white};
    transform: perspective(900px) rotateX(60deg) scale(0.01);
  }

  &:hover::before {
    border-color: ${(props) => props.theme.colors.primary.light};
  }

  &:hover::after {
    background: ${(props) => props.theme.colors.primary.light};
  }
`
