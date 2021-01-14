import React from 'react'
import PropTypes from 'prop-types'
import copy from 'copy-to-clipboard'
import styled from 'styled-components'
import { Create } from '@styled-icons/ionicons-outline/Create'
import { CheckmarkCircle } from '@styled-icons/ionicons-outline/CheckmarkCircle'
import { CloseCircle } from '@styled-icons/ionicons-outline/CloseCircle'
import { Clipboard } from '@styled-icons/ionicons-solid/Clipboard'

import { Button, Input } from 'components/Form'
import { useConfirm } from 'hooks/useConfirm'
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
const SCICreate = styled(Create)``
const SCICheckmarkCircle = styled(CheckmarkCircle)``
const SCICloseCircle = styled(CloseCircle)``

const FullnameContainer = styled.form`
  display: flex;
  align-items: center;
  margin-bottom: ${(props) => props.theme.spacing.xxs};

  &:hover > ${ButtonEdit} {
    width: 30px;
    height: 30px;
    margin-left: ${(props) => props.theme.spacing.xs};
    padding: revert;
    opacity: 1;
  }

  > ${ButtonEdit} {
    width: 0;
    height: 0;
    margin-left: 0;
    opacity: 0;
    transform-origin: center left;
  }

  > ${ButtonSave}, ${ButtonCancel} {
    margin-left: ${(props) => props.theme.spacing.xs};
  }
`

const Text = styled.p<{ hidden?: boolean; semiBold?: boolean; smaller?: boolean }>`
  cursor: pointer;
  user-select: none;
  display: ${(props) => (props.hidden ? 'none' : 'initial')};
  border-radius: ${(props) => props.theme.radius.md};
  margin: 0;
  padding: ${(props) => props.theme.spacing.xxs} ${(props) => props.theme.spacing.xs};
  font-weight: ${(props) => props.theme.font.weight[props.semiBold ? 'semi' : 'normal']};
  font-size: ${(props) => props.theme.font.size[props.smaller ? 'lg' : 'xl']};
  transition: 0.3s;

  &:hover {
    background: ${(props) => props.theme.colors.grey[300]};
  }

  &.disabled {
    pointer-events: none;
  }
`

const Component = ({ isAuthUser, username, fullName, updateUserInfo }: Props) => {
  const confirm = useConfirm()
  const message = useGlobalMessage()
  const fullNameRef = React.useRef<HTMLParagraphElement>(null)
  const usernameRef = React.useRef<HTMLParagraphElement>(null)
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [isEditing, setIsEditing] = React.useState(false)

  const handleCancelEditing = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (inputRef.current.value !== fullName) {
      return confirm.open({
        onCancel(ccInstance) {
          ccInstance.set({
            onclose() {
              inputRef.current.focus()
            },
          })
        },
        onDiscard(ccInstance) {
          ccInstance.set({ onclose: null })
          setIsEditing(false)
        },
        onOk(ccInstance) {
          ccInstance.set({ onclose: null })
          handleUpdateFullname()
        },
      })
    }

    setIsEditing(false)
  }

  const handleUpdateFullname = (event?: React.FormEvent<HTMLFormElement>) => {
    if (event) {
      event.preventDefault()
    }

    const editedFullName = inputRef.current.value

    let error = ''
    if (!editedFullName) {
      error = 'Full name is required'
    } else if (editedFullName.length > 40) {
      error = 'Full name cannot exceed 40 characters'
    }

    if (error) {
      message.add({
        type: MessageType.Danger,
        title: 'Update failed',
        message: error,
      })

      return inputRef.current.focus()
    }

    updateUserInfo({ fullName: inputRef.current.value }).then(() => {
      setIsEditing(false)
    })
  }

  const handleCopyToClipboard = (text: string, ref?: React.RefObject<HTMLParagraphElement>) => {
    copy(text)
    ref.current?.classList.toggle('disabled')
    message.add(
      {
        container: 'top-center',
        type: MessageType.Info,
        message: 'Copied to clipboard',
        dismiss: {
          duration: 2000,
        },
      },
      {
        Icon: Clipboard,
        onRemoval() {
          ref.current?.classList.toggle('disabled')
        },
      }
    )
  }

  return (
    <Container>
      <FullnameContainer onSubmit={handleUpdateFullname}>
        <Text
          semiBold
          ref={fullNameRef}
          hidden={isEditing}
          onClick={() => handleCopyToClipboard(fullName, fullNameRef)}
        >
          {fullName}
        </Text>

        {isEditing ? (
          <React.Fragment>
            <Input
              autoFocus
              ref={inputRef}
              name="fullName"
              defaultValue={fullName}
              onKeyDown={(event) => {
                if (isEditing) {
                  const key = event.key || event.keyCode

                  if (key && (key === 'Escape' || key === 27)) {
                    setIsEditing(false)
                  }
                }
              }}
            />
            <ButtonSave round type="submit" buttonType="primary" icon={SCICheckmarkCircle} />
            <ButtonCancel round buttonType="text" icon={SCICloseCircle} onClick={handleCancelEditing} />
          </React.Fragment>
        ) : isAuthUser ? (
          <ButtonEdit round buttonType="text" icon={SCICreate} onClick={() => setIsEditing(true)} />
        ) : (
          <React.Fragment />
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
  updateUserInfo: PropTypes.func.isRequired,
}

Component.propTypes = componentPropTypes
type Props = PropTypes.InferProps<typeof componentPropTypes>

export default React.memo(Component)
