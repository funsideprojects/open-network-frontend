import React from 'react'
import styled from 'styled-components'
import { FixedSizeList } from 'react-window'

import { Section, TitleContainer, Title, SectionBody } from './Generic.styled'
import Story from './Story'

export const List = styled(FixedSizeList)`
  width: 100%;

  &::-webkit-scrollbar {
    display: none;
  }
`

const Stories = () => {
  return (
    <Section>
      <TitleContainer>
        <Title>Stories</Title>
      </TitleContainer>
      <SectionBody>
        <List layout="horizontal" width={200} height={40} itemCount={10} itemSize={50} overscanCount={3}>
          {Story}
        </List>
      </SectionBody>
    </Section>
  )
}

export default Stories
