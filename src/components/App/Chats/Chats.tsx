import React from 'react'

import Avatar from 'components/Avatar'

import { Container, ListContainer, List, Title, Item, TextContainer, Text, Badge } from './Chats.styled'

const Chats = () => {
  const [expand, setExpand] = React.useState(false)

  return (
    <Container expand={expand}>
      <ListContainer>
        <List>
          <Title onClick={() => setExpand((visible) => !visible)}>Chats</Title>

          <Item>
            <Avatar size="40px" username="xxxx" online typing badge={9999} badgeVisible={!expand} />
            <TextContainer expand={expand}>
              <Text bold>Ovrx</Text>
              <Text small>Lorem ipsum dolor sit amet</Text>
            </TextContainer>
            <Badge expand={expand} count={9999} />
          </Item>
          <Item>
            <Avatar size="40px" username="xxxx" hasStory badge={12} badgeVisible={!expand} />
            <TextContainer expand={expand}>
              <Text bold>Ovrx</Text>
              <Text small>Lorem ipsum dolor sit amet</Text>
            </TextContainer>
            <Badge expand={expand} count={12} />
          </Item>
        </List>
      </ListContainer>
    </Container>
  )
}

export default Chats
