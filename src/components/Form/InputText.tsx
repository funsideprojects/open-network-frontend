import React from 'react'
import { Transition } from 'react-transition-group'

import { usePrevious } from 'hooks/usePrevious'

import {
  InputBaseProps,
  InputContainer,
  InputPrimary,
  ALInput,
  ALInputLabel,
  ALInputUnderline,
  ErrorMessage,
} from './InputText.styled'

interface Props extends Omit<JSX.IntrinsicElements['input'], 'ref'>, InputBaseProps {
  animatedLabel?: boolean
}

const tDuration = 200
const defaultStyle = { transition: `${tDuration}ms`, opacity: 0, position: 'absolute', zIndex: -1 }
const transitionStyles = {
  entering: { opacity: 0, position: 'absolute', top: 0, zIndex: -1 },
  entered: { opacity: 1, position: 'relative', top: 3, zIndex: 1 },
  exiting: { opacity: 0, position: 'relative', top: 0 },
  exited: { opacity: 0, position: 'absolute', zIndex: -1 },
}

export const Input = React.forwardRef<HTMLInputElement, Props>(
  ({ animatedLabel = false, hasPrefix: Prefix, hasSuffix: Suffix, hasError, ...inputProps }, forwardedRef) => {
    const prevError = usePrevious(hasError)

    return (
      <>
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
            <InputPrimary
              {...inputProps}
              ref={forwardedRef}
              hasPrefix={Prefix}
              hasSuffix={Suffix}
              hasError={hasError}
              messageElement={ErrorMessage}
            />
          )}

          {Prefix ? <Prefix className="prefix-icon" /> : <></>}
          {Suffix ? <Suffix className="suffix-icon" /> : <></>}
        </InputContainer>

        <Transition appear in={!!hasError} timeout={tDuration}>
          {(transitionState) => (
            <ErrorMessage style={{ ...defaultStyle, ...transitionStyles[transitionState] }}>
              {hasError || prevError}
            </ErrorMessage>
          )}
        </Transition>
      </>
    )
  }
)

Input.displayName = 'Input'
