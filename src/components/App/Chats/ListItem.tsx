import React from 'react'
import { areEqual, ListChildComponentProps } from 'react-window'

import Avatar from 'components/Avatar'

import { Item, TextContainer, Text, Badge } from './Generic.styled'

const ListItem = ({ index, style, data }: ListChildComponentProps) => {
  return (
    <div key={index} style={style}>
      <Item>
        <Avatar
          size="40px"
          image="https://picsum.photos/30/30"
          username="xxxx"
          online
          typing
          badge={9999}
          badgeVisible={!data.expand}
        />
        <TextContainer expand={data.expand}>
          <Text bold>Ovrx {index}</Text>
          <Text small>Lorem ipsum dolor sit amet</Text>
        </TextContainer>
        <Badge expand={data.expand} count={9999} />
      </Item>
    </div>
  )
}

export default React.memo(ListItem, areEqual)
