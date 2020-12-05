import React from 'react'
import AutoSizer from 'react-virtualized-auto-sizer'

import Avatar from 'components/Avatar'

import {
  Container,
  SubContainer,
  FixedContainer,
  List,
  Title,
  Item,
  TextContainer,
  Text,
  Badge,
} from './Generic.styled'

const Chats = () => {
  const [expand, setExpand] = React.useState(false)

  return (
    <Container expand={expand}>
      <SubContainer>
        <FixedContainer>
          <Title expand={expand} onClick={() => setExpand((visible) => !visible)}>
            Chats
          </Title>

          <AutoSizer>
            {({ height, width }) => (
              <List width={width} height={height} itemCount={20} itemSize={60}>
                {({ index, style }) => (
                  <div key={index} style={style}>
                    <Item>
                      <Avatar size="40px" username="xxxx" online typing badge={9999} badgeVisible={!expand} />
                      <TextContainer expand={expand}>
                        <Text bold>Ovrx {index + 1}</Text>
                        <Text small>Lorem ipsum dolor sit amet</Text>
                      </TextContainer>
                      <Badge expand={expand} count={9999} />
                    </Item>
                  </div>
                )}
              </List>
            )}
          </AutoSizer>

          {/* <Item>
              <Avatar size="40px" username="xxxx" online typing badge={9999} badgeVisible={!expand} />
              <TextContainer expand={expand}>
                <Text bold>Ovrx</Text>
                <Text small>Lorem ipsum dolor sit amet</Text>
              </TextContainer>
              <Badge expand={expand} count={9999} />
            </Item> */}
        </FixedContainer>
      </SubContainer>
    </Container>
  )
}

export default Chats
