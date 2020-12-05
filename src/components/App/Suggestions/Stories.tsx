import React from 'react'

import { List, Title } from './Generic.styled'

const Stories = () => {
  const [, setExpand] = React.useState(false)

  return (
    <List>
      <Title onClick={() => setExpand((visible) => !visible)}>Suggestions</Title>
    </List>
  )
}

export default Stories
