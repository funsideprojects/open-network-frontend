import React, { useState } from 'react'
import styled from 'styled-components'

import Avatar from 'components/Avatar'
import ImagePreview from 'components/ImagePreview'

import { useStore } from 'store'

import { SET_CHAT } from 'store/chat'

// import { MAX_POST_IMAGE_SIZE } from 'constants/ImageSize'

import closeIcon from 'assets/images/svg/sidebar/close.svg'

import { UploadImageIcon, FaceIcon } from 'components/icons'

const Root = styled.div`
  width: 300px;
  height: 360px;
  background: ${(p) => p.theme.colors.white};
  border-radius: ${(p) => p.theme.radius.lg};
  margin-top: ${(p) => p.theme.spacing.sm};
  box-shadow: ${(p) => p.theme.shadows.lg};
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  transform: translate(calc(-100% - 6px), 0px);
`

const HeadBox = styled.div`
  width: 100%;
  height: 40px;
  padding: ${(p) => p.theme.spacing.xs};
  border-bottom: 1px solid ${(p) => p.theme.colors.border.main};
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const WrapperInfo = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`

const FullName = styled.div`
  width: 140px;
  margin-left: ${(p) => p.theme.spacing.xs};
  color: ${(p) => p.theme.colors.grey[700]};
  font-size: ${(p) => p.theme.font.size.xxs};
  font-weight: ${(p) => p.theme.font.weight.bold};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const BodyBox = styled.div`
  width: 100%;
  height: calc(100% - 90px);
  overflow: auto;
  position: relative;
`

const FootBox = styled.div`
  width: 100%;
  height: 50px;
  background-color: ${(p) => p.theme.colors.grey[50]};
  display: flex;
  justify-content: center;
  align-items: center;
`

const CloseButton = styled.button`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 0;
  background: none;
  transition: all 0.4s;
  cursor: pointer;

  img {
    width: 12px;
    height: 12px;
  }

  &:hover {
    background: ${(p) => p.theme.colors.grey[100]};
  }

  &:focus {
    outline: none;
  }
`

const WrapperInput = styled.div`
  width: 90%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`

const WrapperAction = styled.div`
  position: absolute;
  top: 50%;
  right: 5px;
  transform: translate(0, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
`

const RadiusButton = styled.button`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 0;
  background: ${(p) => p.theme.colors.white};
  cursor: pointer;
  transition: all 0.4s;
  display: flex;
  justify-content: center;
  align-items: center;

  &:focus {
    outline: none;
  }

  &:hover {
    background: ${(p) => p.theme.colors.grey[100]};
  }
`

const Input = styled.textarea`
  width: 100%;
  height: 34px;
  border-radius: 999px;
  padding: 4px ${(p) => p.theme.spacing.sm};
  overflow: hidden;

  &:focus {
    outline: none;
    box-shadow: 0px 0px 4px ${(p) => p.theme.colors.primary.main};
  }
`

const SessionChat = styled.div`
  width: 100%;
  height: auto;
`

const ContentSession = styled.div`
  width: 100%;
  padding: 4px 6px;
`

const WrapperMessage = styled.div`
  width: 100%;
  display: flex;
  justify-content: ${(p) => (p.position === 'left' ? 'flex-start' : 'flex-end')};
  align-items: flex-end;
`

const ContentMessage = styled.div`
  width: 160px;
  height: auto;
  margin-left: 6px;
  display: flex;
  flex-direction: column;
  justify-content: ${(p) => (p.position === 'left' ? 'flex-start' : 'flex-end')};
  align-items: ${(p) => (p.position === 'left' ? 'flex-start' : 'flex-end')};
`

const MessageItem = styled.div`
  width: fit-content;
  height: auto;
  padding: 4px 8px;
  box-sizing: content-box;
  border-radius: 12px;
  color: ${(p) => (p.position === 'left' ? p.theme.colors.text.primary : p.theme.colors.white)};
  background: ${(p) => (p.position === 'left' ? p.theme.colors.grey[100] : p.theme.colors.primary.main)};
  margin-top: 3px;
  border-top-left-radius: ${(p) =>
    p.position === 'left' && (p.type === 'bottom' || p.type === 'center') ? '0px' : '12px'};
  border-bottom-left-radius: ${(p) =>
    p.position === 'left' && (p.type === 'top' || p.type === 'center') ? '0px' : '12px'};
  border-top-right-radius: ${(p) =>
    p.position === 'right' && (p.type === 'bottom' || p.type === 'center') ? '0px' : '12px'};
  border-bottom-right-radius: ${(p) =>
    p.position === 'right' && (p.type === 'top' || p.type === 'center') ? '0px' : '12px'};
`

const TimeSession = styled.div`
  display: flex;
  justify-content: center;
  font-size: ${(p) => p.theme.font.size.xxs};
`

const Typing = styled.div`
  position: fixed;
  left: 50%;
  bottom: 51px;
  transform: translate(-50%, 0px);
  font-size: ${(p) => p.theme.font.size.tiny};
  background: ${(p) => p.theme.colors.grey[100]};
  padding: 2px 8px;
  border-radius: ${(p) => p.theme.radius.sm};
`

const InputFile = styled.input`
  display: none;
`

const Label = styled.label`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 9px 9px;
  cursor: pointer;
`

const ListImageUpload = styled.label`
  width: 100%;
  height: 84px;
  background-color: rgba(0, 0, 0, 0.4);
  position: absolute;
  display: flex;
  bottom: 50px;
  left: 50%;
  transform: translate(-50%, 0);
  z-index: 10;
  overflow-x: auto;
`

const MessageBox = () => {
  // eslint-disable-next-line no-unused-vars
  const [{ chat }, dispatch] = useStore()
  const [images, setImages] = useState([])

  const closeMessageBox = () => {
    dispatch({
      type: SET_CHAT,
      payload: {
        isShowMessageBox: false,
        infoUser: null,
      },
    })
  }

  const handlePostImageUpload = (e) => {
    const { files } = e.target

    if (!files.length) return

    const imagesArray = [...images]

    Array.from(files).forEach((file) => {
      imagesArray.push(file)
    })

    setImages(imagesArray)
  }

  const deleteImage = (index) => setImages(images.filter((_img, i) => i !== index))

  return (
    <Root>
      <HeadBox>
        <WrapperInfo>
          <Avatar size={32} isOnline={true} />
          <FullName>Trinh Nhat SInh</FullName>
        </WrapperInfo>
        <CloseButton onClick={closeMessageBox}>
          <img src={closeIcon} alt='icon_close' />
        </CloseButton>
      </HeadBox>
      <BodyBox>
        <SessionChat>
          <ContentSession>
            <WrapperMessage position='left'>
              <Avatar size={32} isOnline={true} />
              <ContentMessage position='left'>
                <MessageItem position='left' type='top'>
                  <span>xin chao</span>
                </MessageItem>
                <MessageItem position='left' type='center'>
                  <span>xin chao</span>
                </MessageItem>
                <MessageItem position='left' type='bottom'>
                  <span>xin chao</span>
                </MessageItem>
                <MessageItem position='left'>
                  <span>xin chao</span>
                </MessageItem>
              </ContentMessage>
            </WrapperMessage>
            <WrapperMessage position='right'>
              <ContentMessage position='right'>
                <MessageItem position='right' type='top'>
                  <span>xin chao</span>
                </MessageItem>
                <MessageItem position='right' type='center'>
                  <span>xin chao</span>
                </MessageItem>
                <MessageItem position='right' type='bottom'>
                  <span>xin chao</span>
                </MessageItem>
                <MessageItem position='right'>
                  <span>xin chao</span>
                </MessageItem>
              </ContentMessage>
            </WrapperMessage>
          </ContentSession>
          <TimeSession>T5 12:00</TimeSession>
        </SessionChat>
      </BodyBox>
      <FootBox>
        <WrapperInput>
          <Input rows={1} />
          <WrapperAction>
            <RadiusButton>
              <InputFile
                id='message-image'
                type='file'
                multiple
                accept='image/x-png,image/jpeg'
                onChange={handlePostImageUpload}
              />
              <Label htmlFor='message-image'>
                <UploadImageIcon size={10} />
              </Label>
            </RadiusButton>
            <RadiusButton>
              <FaceIcon />
            </RadiusButton>
          </WrapperAction>
        </WrapperInput>
      </FootBox>
      {images.length ? (
        <ListImageUpload>
          {images.map((image, index) => {
            return (
              <ImagePreview key={index} image={image} index={index} deleteImage={deleteImage} width={84} height={84} />
            )
          })}
        </ListImageUpload>
      ) : (
        <React.Fragment />
      )}
      <Typing>Typing...</Typing>
    </Root>
  )
}

export default MessageBox
