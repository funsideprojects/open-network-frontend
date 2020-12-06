import React from 'react'
import memoize from 'memoize-one'
import { Help, ChevronDown, ChevronUp } from '@styled-icons/ionicons-outline'

import { Section, TitleContainer, Title, ButtonHint, TitleButton, SectionBody, HorizontalList } from './Generic.styled'
import Story from './Story'

const createItemDate = memoize((data) => data)

const Stories = () => {
  const [expand, setExpand] = React.useState(true)

  const itemData = createItemDate({ expand })

  return (
    <Section expand={expand} expandWidth="90px">
      <TitleContainer>
        <Title active={expand}>
          Stories
          <ButtonHint>
            <Help />
          </ButtonHint>
        </Title>
        <TitleButton onClick={() => setExpand((ex) => !ex)}>{expand ? <ChevronUp /> : <ChevronDown />}</TitleButton>
      </TitleContainer>
      <SectionBody>
        <HorizontalList
          layout="horizontal"
          width={190}
          height={40}
          itemCount={50}
          itemSize={50}
          overscanCount={3}
          itemData={itemData}
        >
          {Story}
        </HorizontalList>
      </SectionBody>
    </Section>
  )
}

export default Stories
