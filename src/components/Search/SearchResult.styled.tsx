import styled from 'styled-components'
import { LeftArrowAlt, RightArrowAlt } from '@styled-icons/boxicons-regular'

import { A } from 'components/Text'

export const Container = styled.div`
  width: 100%;
  overflow: hidden;
  position: absolute;
  border-radius: ${(props) => props.theme.radius.lg};
  margin-top: 4px;
  font-size: 0.9rem;
  background-color: ${(props) => props.theme.colors.white};
`

export const Item = styled.div<{ center?: boolean }>`
  width: 100%;
  display: flex;
  ${(props) => (props.center ? 'justify-content: center;' : '')}
  align-items: center;
  padding: ${(props) => props.theme.spacing.xxs};
`

export const NoSearchResult = styled.div`
  padding: ${(p) => p.theme.spacing.xs};
  text-align: center;
  color: ${(p) => p.theme.colors.primary.main};
`

export const Link = styled(A)`
  display: block;
  transition: 0.3s;

  &:hover {
    color: ${(props) => props.theme.colors.white};
    background-color: ${(props) => props.theme.colors.primary.light};
  }
`

export const Username = styled.span`
  margin-left: ${(props) => props.theme.spacing.xs};
`

export const Text = styled.div<{ bold?: boolean; smaller?: boolean; fade?: boolean }>`
  font-weight: ${(props) => (props.bold ? '600' : '400')};
  font-size: ${(props) => (props.smaller ? '0.8' : '0.9')}rem;
  color: ${(props) => props.theme.colors.text[props.fade ? 'secondary' : 'primary']};
`

export const Pagination = styled(Item)`
  justify-content: space-between;
`

export const SCILeftArrowAlt = styled(LeftArrowAlt)``
export const SCIRightArrowAlt = styled(RightArrowAlt)``
