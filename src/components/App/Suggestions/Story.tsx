import React from 'react'
import styled from 'styled-components'
import { areEqual, ListChildComponentProps } from 'react-window'

import Avatar from 'components/Avatar'

export const ListItem = styled.div`
  cursor: pointer;
  width: 40px;
  height: 40px;
  margin-right: ${(props) => props.theme.spacing.xs};
`

const Component = ({ index, style }: ListChildComponentProps) => {
  return (
    <div key={index} style={style}>
      <ListItem>
        <Avatar
          size="40px"
          // image="https://picsum.photos/30/30"
          username="xxxx"
          story
          badge={2}
        />
      </ListItem>
    </div>
  )
}

export default React.memo(Component, areEqual)
