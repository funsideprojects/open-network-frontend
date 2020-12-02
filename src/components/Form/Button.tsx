import React from 'react'

import Loading from 'components/Loading'

import {
  ButtonBaseProps,
  ButtonContainer,
  ButtonDefault,
  ButtonPrimary,
  ButtonText,
  ContentWrapper,
} from './Button.styled'

interface Props extends Omit<JSX.IntrinsicElements['button'], 'ref'>, Omit<ButtonBaseProps, 'isLoading'> {
  icon?: GenericSC
  loading?: boolean
}

const AvailButtons = {
  default: ButtonDefault,
  primary: ButtonPrimary,
  text: ButtonText,
}

export interface ButtonRefAttributes extends HTMLButtonElement {
  setLoading: (state: boolean) => void
}

export const Button = React.forwardRef<ButtonRefAttributes, Props>(
  (
    { buttonType = 'default', icon: Icon, loading: isLoading, block, danger, children, disabled, ...buttonProps },
    forwardedRef
  ) => {
    // const [isLoading, setIsLoading] = React.useState(false)

    // React.useImperativeHandle(forwardedRef, () => {
    //   return {
    //     ...(forwardedRef as any).current,
    //     setLoading(state: boolean) {
    //       setIsLoading(state)
    //     },
    //   }
    // })

    const ButtonToRender = AvailButtons[buttonType] ?? AvailButtons.default

    const renderChildren = Icon ? (
      isLoading ? (
        <Loading />
      ) : (
        <>
          <Icon />
          {children}
        </>
      )
    ) : (
      <>
        {isLoading ? <Loading /> : <></>}
        {children}
      </>
    )

    return (
      <ButtonContainer block={block}>
        <ButtonToRender
          type="button"
          {...buttonProps}
          isLoading={isLoading}
          disabled={isLoading || disabled}
          ref={forwardedRef}
        >
          <ContentWrapper>{renderChildren}</ContentWrapper>
        </ButtonToRender>
      </ButtonContainer>
    )
  }
)

Button.displayName = 'Button'
