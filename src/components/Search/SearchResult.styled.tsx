import styled from 'styled-components'
import { ArrowBack } from '@styled-icons/ionicons-outline/ArrowBack'
import { ArrowForward } from '@styled-icons/ionicons-outline/ArrowForward'

import { A } from 'components/Text'

export const Container = styled.div`
  width: 100%;
  overflow: hidden;
  position: absolute;
  border-radius: ${(props) => props.theme.radius.lg};
  margin-top: ${(props) => props.theme.spacing.xxs};
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
  width: 100%;
  display: block;
  transition: 0.3s;

  &:hover {
    color: ${(props) => props.theme.colors.white};
    background-color: ${(props) => props.theme.colors.primary.light};

    span {
      color: inherit;
    }
  }
`

export const TextContainer = styled.div`
  overflow: hidden;
  display: flex;
  flex: 1;
  flex-flow: column nowrap;
  padding-left: ${(props) => props.theme.spacing.xs};
`

export const Text = styled.span<{ bold?: boolean; small?: boolean; fade?: boolean }>`
  max-width: 100%;
  overflow: hidden !important;
  margin-bottom: 3px;
  font-weight: ${(props) => (props.bold ? '600' : '400')};
  font-size: ${(props) => (props.small ? '0.8rem' : '0.9rem')};
  line-height: 1.5;
  text-overflow: ellipsis;
  color: ${(props) => props.theme.colors.text[props.fade ? 'secondary' : 'primary']};
`

export const Pagination = styled(Item)`
  justify-content: space-between;
`

export const SCIArrowBack = styled(ArrowBack)``
export const SCIArrowForward = styled(ArrowForward)``
