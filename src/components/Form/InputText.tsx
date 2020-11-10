import React from 'react'
// import PropTypes from 'prop-types'

import {
  InputBaseProps,
  InputContainer,
  InputPrimary,
  ALInput,
  ALInputLabel,
  ALInputUnderline,
} from './InputText.styled'

interface Props extends Omit<JSX.IntrinsicElements['input'], 'ref'>, InputBaseProps {
  animatedLabel?: boolean
}

export const Input = React.forwardRef<HTMLInputElement, Props>(
  ({ animatedLabel = false, hasPrefix: Prefix, hasSuffix: Suffix, hasError, ...inputProps }, forwardedRef) => {
    return (
      <InputContainer>
        {animatedLabel ? (
          <>
            <ALInput
              {...inputProps}
              ref={forwardedRef}
              Label={ALInputLabel}
              Underline={ALInputUnderline}
              hasPrefix={Prefix}
              hasSuffix={Suffix}
              hasError={hasError}
            />
            <ALInputLabel>{inputProps.placeholder}</ALInputLabel>
            <ALInputUnderline />
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
