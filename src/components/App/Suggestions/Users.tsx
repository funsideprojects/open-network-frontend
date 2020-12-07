import React from 'react'
import { ChevronDown, ChevronUp } from '@styled-icons/ionicons-outline'

import { Section, TitleContainer, Title, TitleButton, SectionBody } from './Generic.styled'

const Users = () => {
  const [expand, setExpand] = React.useState(true)
  const bodyRef = React.useRef<HTMLDivElement>(null)

  return (
    <Section expand={expand} expandWidth="100px">
      <TitleContainer>
        <Title active={expand}>Users</Title>
        <TitleButton onClick={() => setExpand((ex) => !ex)}>{expand ? <ChevronUp /> : <ChevronDown />}</TitleButton>
      </TitleContainer>
      <SectionBody ref={bodyRef}>asad</SectionBody>
    </Section>
  )
}

export default Users
