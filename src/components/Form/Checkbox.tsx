import React from 'react'

import { CheckboxContainer, CheckboxComponent, CheckboxLabel } from './Checkbox.styled'

interface Props extends Omit<JSX.IntrinsicElements['input'], 'ref'> {
  label?: string
  hasError?: boolean
}

export const Checkbox = React.forwardRef<HTMLInputElement, Props>(
  ({ label, hasError, ...checkboxProps }, forwardedRef) => {
    return (
      <CheckboxContainer>
        <CheckboxComponent {...checkboxProps} ref={forwardedRef} Label={CheckboxLabel} />
        <CheckboxLabel>{label}</CheckboxLabel>
      </CheckboxContainer>
    )
  }
)
