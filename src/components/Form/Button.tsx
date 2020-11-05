import React from 'react'

import { BaseButtonProps, BaseButton, ButtonContainer, ButtonSubmitLabel, ButtonSubmit } from './Button.styled'

interface Props extends Omit<JSX.IntrinsicElements['button'], 'ref'>, BaseButtonProps {
  typeSubmit?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, Props>(
  ({ typeSubmit, buttonType = 'default', children, ...buttonProps }, forwardedRef) => {
    return (
      <ButtonContainer>
        {typeSubmit ? (
          <ButtonSubmitLabel>
            <ButtonSubmit />
            {children}
          </ButtonSubmitLabel>
        ) : (
          <BaseButton type="button" buttonType={buttonType} {...buttonProps} ref={forwardedRef}>
            {children}
          </BaseButton>
        )}
      </ButtonContainer>
    )
  }
)
