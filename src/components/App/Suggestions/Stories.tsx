import React from 'react'
import memoize from 'memoize-one'
import { Help, ChevronDown, ChevronUp } from '@styled-icons/ionicons-outline'

import { Section, TitleContainer, Title, ButtonHint, TitleButton, SectionBody, HorizontalList } from './Generic.styled'
import Story from './Story'

const createItemDate = memoize((data) => data)

const Stories = () => {
  const [expand, setExpand] = React.useState(false)
  // const listRef = React.useRef<any>(null)
  // const listOuterRef = React.useRef<any>(null)

  const itemData = createItemDate({ expand })

  return (
    <Section expand={expand} expandWidth="90px">
      <TitleContainer>
        <Title active={expand}>
          Stories{' '}
          <ButtonHint>
            <Help />
          </ButtonHint>
        </Title>
        <TitleButton onClick={() => setExpand((ex) => !ex)}>{expand ? <ChevronUp /> : <ChevronDown />}</TitleButton>
      </TitleContainer>
      <SectionBody>
        <HorizontalList
          // ref={listRef}
          // outerRef={listOuterRef}
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
        {/* <ScrollButton
          onClick={() => {
            console.log(listOuterRef.current)
            listOuterRef.current?.scrollTo({
              left: listRef.current.state.scrollOffset + 170,
              top: 0,
              behavior: 'smooth',
            })
          }}
        >
          <ChevronForward />
        </ScrollButton> */}
      </SectionBody>
    </Section>
  )
}

export default Stories
