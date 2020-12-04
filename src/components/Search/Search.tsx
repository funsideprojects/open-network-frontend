import React from 'react'
import styled from 'styled-components'

import SearchInput from './SearchInput'
import SearchResult from './SearchResult'

const Container = styled.div<{ expand?: boolean }>`
  width: ${(props) => (props.expand ? '230px' : '140px')};
  position: relative;
  transition: 0.3s;

  @media screen and (min-width: ${(props) => props.theme.screen.lg}) {
    width: 260px;
  }
`

const Search = () => {
  const containerRef = React.useRef(null)
  const [expand, setExpand] = React.useState(false)

  return (
    <Container ref={containerRef} expand={expand}>
      <SearchInput containerRef={containerRef} expand={expand} setExpand={setExpand} />
      <SearchResult expand={expand} />
    </Container>
  )
}

export default Search
