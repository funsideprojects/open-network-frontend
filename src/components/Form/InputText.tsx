import React from 'react'
// import PropTypes from 'prop-types'

import { BaseInputProps, InputContainer, BaseInput, ACInput, ACInputLabel, ACInputUnderline } from './InputText.styled'

interface Props extends Omit<JSX.IntrinsicElements['input'], 'ref'>, BaseInputProps {
  authControl?: boolean
}

export const Input = React.forwardRef<HTMLInputElement, Props>(
  ({ authControl, hasPrefix: Prefix, hasSuffix: Suffix, hasError, ...inputProps }, forwardedRef) => {
    return (
      <InputContainer hasError={hasError}>
        {authControl ? (
          <>
            <ACInput
              {...inputProps}
              ref={forwardedRef}
              Label={ACInputLabel}
              Underline={ACInputUnderline}
              hasPrefix={Prefix}
              hasSuffix={Suffix}
            />
            <ACInputLabel>{inputProps.placeholder}</ACInputLabel>
            <ACInputUnderline />
          </>
        ) : (
          <BaseInput {...inputProps} ref={forwardedRef} hasPrefix={Prefix} hasSuffix={Suffix} hasError={hasError} />
        )}

        {Prefix ? <Prefix className="prefix-icon" /> : <></>}
        {Suffix ? <Suffix className="suffix-icon" /> : <></>}
      </InputContainer>
    )
  }
)
