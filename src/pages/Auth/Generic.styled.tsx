import styled from 'styled-components'
import { LeftArrowAlt, RightArrowAlt } from '@styled-icons/boxicons-regular'

interface DrawerProps {
  fullHeight?: boolean
  float: 'left' | 'right'
}

export const Drawer = styled.section<DrawerProps>`
  width: 40%;
  height: ${(props) => (props.fullHeight ? '100%' : 'fit-content')};
  max-height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  position: absolute;
  top: 0;
  display: flex;
  flex-direction: column;
  box-shadow: ${(props) => props.theme.shadows.sm};
  ${(props) =>
    !props.fullHeight
      ? `
top: ${props.theme.spacing.lg};
border-top-${props.float === 'left' ? 'right' : 'left'}-radius: ${props.theme.radius.lg};
border-bottom-${props.float === 'left' ? 'right' : 'left'}-radius: ${props.theme.radius.lg};
`
      : ''}
  padding: ${(props) => props.theme.spacing.xxl};
  background: ${(props) => props.theme.colors.white};
`

export const Title = styled.h1`
  margin: ${(props) => props.theme.spacing.lg} 0;
  font-weight: ${(props) => props.theme.font.weight.extra};
  font-size: ${(props) => props.theme.font.size.xl};
`

export const PrimaryText = styled.span`
  ${(props) =>
    typeof props.onClick === 'function'
      ? `
cursor: pointer;
user-select: none;
font-weight: ${props.theme.font.weight.semi};
transition: 0.3s;

&:hover {
  color: ${props.theme.colors.primary.light};
}
`
      : ''}
  color: ${(props) => props.theme.colors.primary.main};
`

interface ParagraphsProps {
  noMargin?: boolean
}

export const Paragraphs = styled.p<ParagraphsProps>`
  ${(props) => (props.noMargin ? 'margin: 0;' : `margin-bottom: ${props.theme.spacing.lg};`)}
  font-family: ${(props) => props.theme.font.secondary};
  font-size: ${(props) => props.theme.font.size.sm};
  letter-spacing: ${(props) => props.theme.font.spacing.letter.md};
  color: ${(props) => props.theme.colors.grey[500]};
`

interface HintProps {
  align: 'left' | 'right'
}

export const Hint = styled.p<HintProps>`
  margin: 0;
  font-size: ${(props) => props.theme.font.size.xxs};
  text-align: ${(props) => props.align};
`

export const SCILeftArrowAlt = styled(LeftArrowAlt)`
  width: 30px;
  height: 30px;
`

export const SCIRightArrowAlt = styled(RightArrowAlt)`
  width: 20px;
  height: 20px;
`
