import React from 'react'
import styled from 'styled-components'

import { useClickOutside } from 'hooks/useClickOutside'

import SearchInput from './SearchInput'
import SearchResult from './SearchResult'

const Container = styled.div<{ expand?: boolean }>`
  width: ${(props) => (props.expand ? '260px' : '140px')};
  position: relative;
  transition: 0.3s;

  @media screen and (min-width: ${(props) => props.theme.screen.lg}) {
    width: 260px;

    label {
      > input {
        padding-right: calc(${(props) => props.theme.spacing.sm} - 2px);
      }

      > .suffix-icon {
        display: none;
      }
    }
  }
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
