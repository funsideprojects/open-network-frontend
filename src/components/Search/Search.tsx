import React from 'react'
import styled from 'styled-components'

import { useClickOutside } from 'hooks/useClickOutside'

import SearchInput from './SearchInput'
import SearchResult from './SearchResult'

const Container = styled.div<{ expand?: boolean }>`
  width: ${(props) => (props.expand ? '300px' : '140px')};
  position: relative;
  transition: 0.3s;
`

const Search = () => {
  const containerRef = React.useRef(null)
  const [expand, setExpand] = React.useState(false)

  useClickOutside(containerRef, () => {
    setExpand(false)
  })

  return (
    <Container ref={containerRef} expand={expand}>
      <SearchInput expand={expand} setExpand={setExpand} />
      <SearchResult expand={expand} />
    </Container>
  )
}

export default Search
