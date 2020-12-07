import React from 'react'
import { areEqual, ListChildComponentProps } from 'react-window'

import Avatar from 'components/Avatar'

import { Container, TextContainer, Text, Badge } from './Chat.styled'

const Chat = ({ index, style, data }: ListChildComponentProps) => {
  return (
    <div key={index} style={style}>
      <Container>
        <Avatar
          size="40px"
          // image="https://picsum.photos/30/30"
          username="xxxx"
          online
          typing
          badge={999}
          badgeVisible={!data.expand}
        />

        <TextContainer visible={data.expand}>
          <Text bold>Ovrx {index}</Text>
          <Text small>Lorem ipsum dolor sit amet</Text>
        </TextContainer>

        <Badge visible={data.expand} count={9999} />
      </Container>
    </div>
  )
}

export default React.memo(Chat, areEqual)
