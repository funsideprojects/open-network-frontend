import React from 'react'
import AutoSizer from 'react-virtualized-auto-sizer'
import memoize from 'memoize-one'

import { Container, SubContainer, FixedContainer, List, Title } from './Chats.styled'
import Chat from './Chat'

const chatsExpandKey = 'chatsExpand'

const createItemDate = memoize((data) => data)

const Chats = () => {
  const [expand, setExpand] = React.useState(localStorage.getItem(chatsExpandKey) === 'true')

  const handleExpand = () => {
    setExpand((visible) => {
      localStorage.setItem(chatsExpandKey, visible ? 'false' : 'true')

      return !visible
    })
  }

  const itemData = createItemDate({ expand })

  return (
    <Container expand={expand}>
      <SubContainer>
        <FixedContainer>
          <Title expand={expand} onClick={handleExpand}>
            Chats
          </Title>

          <AutoSizer disableWidth>
            {({ height, width }) => {
              return (
                <List width={width} height={height} itemCount={5} itemSize={60} overscanCount={3} itemData={itemData}>
                  {Chat}
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
