import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { StyledIcon } from '@styled-icons/styled-icon'
import { CheckmarkCircle } from '@styled-icons/ionicons-solid/CheckmarkCircle'
import { AlertCircle } from '@styled-icons/ionicons-solid/AlertCircle'
import { CloseCircle } from '@styled-icons/ionicons-solid/CloseCircle'
import { InformationCircle } from '@styled-icons/ionicons-solid/InformationCircle'
import { EllipsisHorizontalCircle } from '@styled-icons/ionicons-solid/EllipsisHorizontalCircle'

import { MessageType } from 'hooks/useGlobalMessage'

const Container = styled.div<{ type: MessageType }>`
  width: 100%;
  display: flex;
  align-items: center;
  border-radius: ${(props) => props.theme.radius.md};
  padding: ${(props) => props.theme.spacing.xs};
  font-family: ${(props) => props.theme.font.secondary};
  color: ${(props) => props.theme.colors[props.type].contrastText};
  background: ${(props) => props.theme.opacityToHex(0.95, props.theme.colors[props.type].dark)};
`

const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${(props) => props.theme.spacing.xxs};
`

const IconWrapper = styled.div<{ type: MessageType }>`
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: ${(props) => props.theme.radius.round};
  color: inherit;
  background: ${(props) => props.theme.opacityToHex(0.2, props.theme.colors[props.type].contrastText)};

  > svg {
    width: 16px;
    height: 16px;
  }
`

const Content = styled.div`
  display: flex;
  flex-flow: column nowrap;
  padding: 0 ${(props) => props.theme.spacing.xs};
`

const Title = styled.p`
  margin: 0 0 ${(props) => props.theme.spacing.xxs};
  font-weight: ${(props) => props.theme.font.weight.semi};
  font-size: ${(props) => props.theme.font.size.xs};
  color: inherit;
`
const Message = styled.p`
  margin: 0;
  font-size: ${(props) => props.theme.font.size.xxs};
  color: inherit;
`

const IconRenderer = (type: MessageType, Icon?: StyledIcon) => {
  if (Icon) {
    return <Icon />
  } else {
    switch (type) {
      case MessageType.Info:
        return <InformationCircle />
      case MessageType.Success:
        return <CheckmarkCircle />
      case MessageType.Warning:
        return <AlertCircle />
      case MessageType.Danger:
        return <CloseCircle />

      default:
        return <EllipsisHorizontalCircle />
    }
  }
}

const Component = ({ id, icon, title, message, type }: Props) => {
  return (
    <Container type={type}>
      <IconContainer>
        <IconWrapper type={type}>{IconRenderer(type, icon)}</IconWrapper>
      </IconContainer>
      <Content>
        {title ? <Title>{title}</Title> : <React.Fragment />}
        {message ? <Message>{message}</Message> : <React.Fragment />}
      </Content>
    </Container>
  )
}

const componentPropTypes = {
  id: PropTypes.string.isRequired,
  icon: PropTypes.any,
  title: PropTypes.oneOfType([PropTypes.node, PropTypes.func, PropTypes.string]),
  message: PropTypes.oneOfType([PropTypes.node, PropTypes.func, PropTypes.string]),
  type: PropTypes.oneOf(Object.values(MessageType)).isRequired,
}

Component.propTypes = componentPropTypes
type Props = PropTypes.InferProps<typeof componentPropTypes>

export default Component
