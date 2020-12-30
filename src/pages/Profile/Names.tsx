import React from 'react'
import PropTypes from 'prop-types'
import copy from 'copy-to-clipboard'
import styled from 'styled-components'
import { Create } from '@styled-icons/ionicons-outline/Create'
import { CloseCircle } from '@styled-icons/ionicons-outline/CloseCircle'
import { CheckmarkCircle } from '@styled-icons/ionicons-outline/CheckmarkCircle'
import { Clipboard } from '@styled-icons/ionicons-solid/Clipboard'

import { Button, Input } from 'components/Form'
import { MessageType, useGlobalMessage } from 'hooks/useGlobalMessage'

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column wrap;
  align-items: center;
`

const ButtonEdit = styled(Button)``
const ButtonSave = styled(Button)``
const ButtonCancel = styled(Button)``

const FullnameContainer = styled.form`
  display: flex;
  align-items: center;

  > ${ButtonEdit} {
    width: 0;
    height: 0;
    margin-left: 0;
    opacity: 0;
    transform-origin: center left;
  }

  &:hover > ${ButtonEdit} {
    width: 30px;
    height: 30px;
    margin-left: ${(props) => props.theme.spacing.xs};
    padding: revert;
    opacity: 1;
  }

  > ${ButtonSave}, ${ButtonCancel} {
    margin-left: ${(props) => props.theme.spacing.xs};
  }
`

const Text = styled.p<{ semiBold?: boolean; smaller?: boolean }>`
  cursor: pointer;
  user-select: none;
  border-radius: ${(props) => props.theme.radius.md};
  margin: 0;
  padding: ${(props) => props.theme.spacing.xxs};
  font-weight: ${(props) => props.theme.font.weight[props.semiBold ? 'semi' : 'normal']};
  font-size: ${(props) => props.theme.font.size[props.smaller ? 'lg' : 'xl']};
  transition: 0.3s;

  &:hover {
    color: ${(props) => props.theme.colors.text.secondary};
    background: ${(props) => props.theme.colors.grey[300]};
  }

  &.disabled {
    pointer-events: none;
  }
`

const SCICreate = styled(Create)``
const SCICloseCircle = styled(CloseCircle)``
const SCICheckmarkCircle = styled(CheckmarkCircle)``

const Component = ({ isAuthUser, username, fullName }: Props) => {
  const message = useGlobalMessage()
  const fullNameRef = React.useRef<HTMLParagraphElement>(null)
  const usernameRef = React.useRef<HTMLParagraphElement>(null)
  const [isEditing, setIsEditing] = React.useState(false)

  const handleUpdateFullname = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setIsEditing(false)
  }

  const handleCopyToClipboard = (text: string, ref: React.RefObject<HTMLParagraphElement>) => {
    copy(text)
    ref.current.classList.toggle('disabled')
    message.add(
      {
        container: 'top-center',
        type: MessageType.Info,
        title: text,
        message: 'Copied to clipboard',
        dismiss: {
          duration: 2000,
        },
      },
      {
        Icon: Clipboard,
        onRemoval() {
          ref.current.classList.toggle('disabled')
        },
      }
    )
  }

  return (
    <Container>
      <FullnameContainer onSubmit={handleUpdateFullname}>
        {isEditing ? (
          <React.Fragment>
            <Input autoFocus defaultValue={fullName} onBlur={() => setIsEditing(false)} />
            <ButtonSave round type="submit" buttonType="text" icon={SCICheckmarkCircle} />
            <ButtonCancel round buttonType="text" icon={SCICloseCircle} onClick={() => setIsEditing(false)} />
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Text semiBold ref={fullNameRef} onClick={() => handleCopyToClipboard(fullName, fullNameRef)}>
              {fullName}
            </Text>
            {isAuthUser && <ButtonEdit round buttonType="text" icon={SCICreate} onClick={() => setIsEditing(true)} />}
          </React.Fragment>
        )}
      </FullnameContainer>

      <Text smaller ref={usernameRef} onClick={() => handleCopyToClipboard(`@${username}`, usernameRef)}>
        @{username}
      </Text>
    </Container>
  )
}

const componentPropTypes = {
  isAuthUser: PropTypes.bool.isRequired,
  username: PropTypes.string.isRequired,
  fullName: PropTypes.string.isRequired,
}

Component.propTypes = componentPropTypes
type Props = PropTypes.InferProps<typeof componentPropTypes>

export default React.memo(Component)
