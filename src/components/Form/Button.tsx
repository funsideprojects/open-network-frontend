import React from 'react'

import { Loading } from 'components/Loading'

import {
  ButtonBaseProps,
  ButtonContainer,
  ButtonDefault,
  ButtonPrimary,
  ButtonText,
  ContentWrapper,
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
    const ButtonToRender = AvailButtons[buttonType]

    const renderChildren = Icon ? (
      loading ? (
        <Loading />
      ) : (
        <>
          <Icon />
          {children}
        </>
      )
    ) : (
      <>
        {loading ? <Loading /> : <></>}
        {children}
      </>
    )

    return (
      <ButtonContainer block={block}>
        <ButtonToRender type="button" {...buttonProps} disabled={loading || disabled} ref={forwardedRef}>
          <ContentWrapper>{renderChildren}</ContentWrapper>
        </ButtonToRender>
      </ButtonContainer>
    )
  }
)
