import React from 'react'
import { areEqual, ListChildComponentProps } from 'react-window'

import Avatar from 'components/Avatar'

import { HorizontalListItem } from './Generic.styled'

const Story = ({ index, style, data }: ListChildComponentProps) => {
  return (
    <div key={index} style={style}>
      <HorizontalListItem>
        <Avatar
          size="40px"
          // image="https://picsum.photos/30/30"
          username="xxxx"
          hasStory
        />
      </HorizontalListItem>
    </div>
  )
}

export default React.memo(Story, areEqual)
