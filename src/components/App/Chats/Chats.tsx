import React from 'react'
import AutoSizer from 'react-virtualized-auto-sizer'
import memoize from 'memoize-one'

import { Container, SubContainer, FixedContainer, List, Title } from './Generic.styled'
import ListItem from './ListItem'

const createItemDate = memoize((data) => data)

const Chats = () => {
  const [expand, setExpand] = React.useState(false)

  const itemData = createItemDate({ expand })

  return (
    <Container expand={expand}>
      <SubContainer>
        <FixedContainer>
          <Title expand={expand} onClick={() => setExpand((visible) => !visible)}>
            Chats
          </Title>

          <AutoSizer disableWidth>
            {({ height, width }) => {
              return (
                <List width={width} height={height} itemCount={5} itemSize={60} overscanCount={3} itemData={itemData}>
                  {ListItem}
                </List>
              )
            }}
          </AutoSizer>
        </FixedContainer>
      </SubContainer>
    </Container>
  )
}

export default Chats
