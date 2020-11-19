import styled from 'styled-components'
import { LeftArrowAlt, RightArrowAlt, Check, X } from '@styled-icons/boxicons-regular'

interface DrawerProps {
  fullHeight?: boolean
  float: 'left' | 'right'
}

export const Drawer = styled.section<DrawerProps>`
  width: 50%;
  max-width: 550px;
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
  padding: ${(props) => props.theme.spacing.lg};
  background: ${(props) => props.theme.colors.white};

  @media only screen and (min-width: ${(props) => props.theme.screen.lg}) {
    & {
      width: 40%;
      padding: ${(props) => props.theme.spacing.xl};
    }
  }

  @media only screen and (min-width: ${(props) => props.theme.screen.xl}) {
    & {
      padding: ${(props) => props.theme.spacing.xxl};
    }
  }
`

export const Title = styled.h1`
  margin: ${(props) => props.theme.spacing.lg} 0 ${(props) => props.theme.spacing.sm};
  font-family: ${(props) => props.theme.font.secondary};
  font-weight: ${(props) => props.theme.font.weight.extra};
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
  width: 30px !important;
  height: 30px !important;
`

export const SCIRightArrowAlt = styled(RightArrowAlt)``
export const SCICheck = styled(Check)``
export const SCIX = styled(X)``