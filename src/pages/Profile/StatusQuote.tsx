import React from 'react'
import PropTypes from 'prop-types'
import copy from 'copy-to-clipboard'
import styled from 'styled-components'
import { Create } from '@styled-icons/ionicons-outline/Create'
import { Trash } from '@styled-icons/ionicons-outline/Trash'
import { Clipboard } from '@styled-icons/ionicons-outline/Clipboard'

import { MessageType, useGlobalMessage } from 'hooks/useGlobalMessage'

const Container = styled.div<{ editable: boolean }>`
  width: 100%;
  max-width: 400px;
  min-height: 56px;
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: center;
  border-radius: ${(props) => props.theme.radius.md};
  margin: ${(props) => props.theme.spacing.xxs};

  &:hover {
    ${(props) =>
      props.editable &&
      `
        > div {
          opacity: 1;
        }
    `}
  }
`

const Text = styled.p<{ fade?: boolean }>`
  user-select: none;
  width: 100%;
  margin: 0;
  padding: ${(props) => props.theme.spacing.xs};
  font-size: ${(props) => props.theme.font.size.xs};
  text-align: center;
  color: ${(props) => props.theme.colors.text[props.fade ? 'secondary' : 'primary']};
  transition: 0.3s;
`

const Overlay = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.colors.white};
  background: ${(props) => props.theme.opacityToHex(0.1, props.theme.colors.black)};
  opacity: 0;
  transition: 0.2s;

  > svg {
    width: 24px;
    height: 24px;
  }
`

const Button = styled.div`
  cursor: pointer;
  width: 36px;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: ${(props) => props.theme.radius.round};
  margin: 0 ${(props) => props.theme.spacing.xs};
  background: ${(props) => props.theme.opacityToHex(0.6, props.theme.colors.black)};
  transition: 0.3s;

  &:hover {
    background: ${(props) => props.theme.opacityToHex(0.9, props.theme.colors.black)};
  }
`

const Component = ({ isAuthUser, statusQuote, updateUserInfo }: Props) => {
  const message = useGlobalMessage()
  const [isEditing, setIsEditing] = React.useState(false)

  const handleCopyToClipboard = (text: string) => {
    copy(text)
    message.add(
      {
        container: 'top-center',
        type: MessageType.Info,
        message: 'Copied to clipboard',
        dismiss: {
          duration: 2000,
        },
      },
      { Icon: Clipboard }
    )
  }

  // ? Render nothing if there's neither status quote nor auth user
  if (!statusQuote && !isAuthUser) {
    return <React.Fragment />
  }

  return (
    <Container editable={isAuthUser}>
      {isEditing ? (
        <React.Fragment />
      ) : (
        <React.Fragment>
          <Text fade>{statusQuote || 'Add status quote'}</Text>
          <Overlay>
            {isAuthUser ? (
              <React.Fragment>
                <Button onClick={() => setIsEditing(true)}>
                  <Create />
                </Button>

                {statusQuote ? (
                  <Button onClick={() => updateUserInfo({ statusQuote: '' })}>
                    <Trash />
                  </Button>
                ) : (
                  <React.Fragment />
                )}
              </React.Fragment>
            ) : (
              <Button onClick={() => handleCopyToClipboard(statusQuote)}>
                <Clipboard />
              </Button>
            )}
          </Overlay>
        </React.Fragment>
      )}
    </Container>
  )
}

const componentPropTypes = {
  isAuthUser: PropTypes.bool.isRequired,
  statusQuote: PropTypes.string,
  updateUserInfo: PropTypes.func.isRequired,
}

Component.propTypes = componentPropTypes
type Props = PropTypes.InferProps<typeof componentPropTypes>

export default Component
