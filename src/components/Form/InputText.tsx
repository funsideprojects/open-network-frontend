import React from 'react'
// import PropTypes from 'prop-types'

import {
  InputBaseProps,
  InputContainer,
  InputPrimary,
  ACInput,
  ACInputLabel,
  ACInputUnderline,
} from './InputText.styled'

interface Props extends Omit<JSX.IntrinsicElements['input'], 'ref'>, InputBaseProps {
  authControl?: boolean
}

export const Input = React.forwardRef<HTMLInputElement, Props>(
  ({ authControl = false, hasPrefix: Prefix, hasSuffix: Suffix, hasError, ...inputProps }, forwardedRef) => {
    return (
      <InputContainer>
        {authControl ? (
          <>
            <ACInput
              {...inputProps}
              ref={forwardedRef}
              Label={ACInputLabel}
              Underline={ACInputUnderline}
              hasPrefix={Prefix}
              hasSuffix={Suffix}
              hasError={hasError}
            />
            <ACInputLabel>{inputProps.placeholder}</ACInputLabel>
            <ACInputUnderline />
          </>
        ) : (
          <InputPrimary {...inputProps} ref={forwardedRef} hasPrefix={Prefix} hasSuffix={Suffix} hasError={hasError} />
        )}

        {Prefix ? <Prefix className="prefix-icon" /> : <></>}
        {Suffix ? <Suffix className="suffix-icon" /> : <></>}
      </InputContainer>
    )
  }
)
