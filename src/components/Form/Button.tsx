import React from 'react'

import { Loading } from 'components/Loading'

import {
  ButtonBaseProps,
  ButtonContainer,
  ButtonDefault,
  ButtonPrimary,
  ButtonText,
  ButtonIconContainer,
} from './Button.styled'

interface Props extends Omit<JSX.IntrinsicElements['button'], 'ref'>, ButtonBaseProps {
  icon?: GenericSC
  loading?: boolean
}

const AvailButtons = {
  default: ButtonDefault,
  primary: ButtonPrimary,
  text: ButtonText,
}

export const Button = React.forwardRef<HTMLButtonElement, Props>(
  (
    { buttonType = 'default', icon: Icon, block, danger, loading, children, disabled, ...buttonProps },
    forwardedRef
  ) => {
    const ButtonRender = AvailButtons[buttonType]

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
        <ButtonRender type="button" {...buttonProps} disabled={loading || disabled} ref={forwardedRef}>
          {renderChildren}
        </ButtonRender>
      </ButtonContainer>
    )
  }
)
