import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

export enum FlashMessageType {
  Error = 'error',
  Warning = 'warning',
  Success = 'success',
  Info = 'info',
}

const BackgroundSVG = styled.svg.attrs<Partial<FlashMessageProps>>((props) => ({
  fill: props.theme.colors[props.messageType!].main,
}))<Partial<FlashMessageProps>>`
  position: absolute;
  top: 0;
  left: 0;
`

const IconSVG = styled.svg.attrs((props) => ({
  width: 100,
  height: 100,
  fill: props.theme.colors.white,
}))`
  position: absolute;
`

const IconPath = (messageType: FlashMessageType) => {
  switch (messageType) {
    case FlashMessageType.Error:
      return 'M20,2H4C2.897,2,2,2.894,2,3.992v12.016C2,17.106,2.897,18,4,18h3v4l6.351-4H20c1.103,0,2-0.894,2-1.992V3.992 C22,2.894,21.103,2,20,2z M16.707,13.293l-1.414,1.414L12,11.414l-3.293,3.293l-1.414-1.414L10.586,10L7.293,6.707l1.414-1.414 L12,8.586l3.293-3.293l1.414,1.414L13.414,10L16.707,13.293z'
    case FlashMessageType.Warning:
      return 'M20,2H4C2.897,2,2,2.894,2,3.992v12.016C2,17.106,2.897,18,4,18h3v4l6.351-4H20c1.103,0,2-0.894,2-1.992V3.992 C22,2.894,21.103,2,20,2z M13,15h-2v-2h2V15z M13,11h-2V5h2V11z'
    case FlashMessageType.Success:
      return 'M20,2H4C2.897,2,2,2.894,2,3.992v12.016C2,17.106,2.897,18,4,18h3v4l6.351-4H20c1.103,0,2-0.894,2-1.992V3.992 C22,2.894,21.103,2,20,2z M11,13.914l-3.707-3.707l1.414-1.414L11,11.086l4.793-4.793l1.414,1.414L11,13.914z'
    case FlashMessageType.Info:
      return 'M20,2H4C2.897,2,2,2.894,2,3.992v12.016C2,17.106,2.897,18,4,18h3v4l6.351-4H20c1.103,0,2-0.894,2-1.992V3.992 C22,2.894,21.103,2,20,2z M14,13H7v-2h7V13z M17,9H7V7h10V9z'

    default:
      return ''
  }
}

const Top = styled.div`
  width: 100%;
  height: 210px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Bottom = styled.div`
  width: 100%;
  height: auto;
  padding: ${(props) => props.theme.spacing.sm};
  background: ${(props) => props.theme.colors.white};
`

export const FlashMessage = ({ messageType, children }: FlashMessageProps) => {
  return (
    <>
      <Top>
        <BackgroundSVG viewBox="0 0 40 21" messageType={messageType}>
          <clipPath id="cirleClipPath">
            <circle cx={[0, 40][~~(Math.random() * 2)]} cy={[0, 20][~~(Math.random() * 2)]} r="30" />
          </clipPath>
          <path id="rect-quadratic-border" d="M 0,0 40,0 40,20 Q 30,22 20,20 T 0,20 Z" />
          <use clipPath="url(#cirleClipPath)" xlinkHref="#rect-quadratic-border" fill="rgba(255, 255, 255, 0.15)" />
        </BackgroundSVG>

        <IconSVG viewBox="0 0 24 24">
          <path d={IconPath(messageType)} />
        </IconSVG>
      </Top>

      <Bottom>{children}</Bottom>
    </>
  )
}

const flashMessageProps = {
  children: PropTypes.node,
  messageType: PropTypes.oneOf<FlashMessageType>([
    FlashMessageType.Error,
    FlashMessageType.Warning,
    FlashMessageType.Success,
    FlashMessageType.Info,
  ]).isRequired,
}

FlashMessage.propTypes = flashMessageProps
type FlashMessageProps = PropTypes.InferProps<typeof flashMessageProps>
