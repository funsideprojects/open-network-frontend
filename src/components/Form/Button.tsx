import React from 'react'

import { Loading } from 'components/Loading'

import {
  BaseButtonProps,
  BaseButton,
  ButtonContainer,
  ButtonSubmitLabel,
  ButtonSubmit,
  ButtonIconContainer,
} from './Button.styled'

interface Props extends Omit<JSX.IntrinsicElements['button'], 'ref'>, BaseButtonProps {
  typeSubmit?: boolean
  icon?: GenericSC
  loading?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, Props>(
  (
    { typeSubmit, buttonType = 'default', block, danger, icon: Icon, loading, children, disabled, ...buttonProps },
    forwardedRef
  ) => {
    const renderChildren = Icon ? (
      <ButtonIconContainer>
        {loading ? (
          <Loading />
        ) : (
          <>
            <Icon />
            {children}
          </>
        )}
      </ButtonIconContainer>
    ) : (
      <>
        {loading ? <Loading /> : <></>}
        {children}
      </>
    )

    return (
      <ButtonContainer block={block}>
        {typeSubmit ? (
          <ButtonSubmitLabel>
            <ButtonSubmit disabled={loading || disabled} />
            {renderChildren}
          </ButtonSubmitLabel>
        ) : (
          <BaseButton
            type="button"
            buttonType={buttonType}
            block={block}
            disabled={loading || disabled}
            {...buttonProps}
            ref={forwardedRef}
          >
            {renderChildren}
          </BaseButton>
        )}
      </ButtonContainer>
    )
  }
)
