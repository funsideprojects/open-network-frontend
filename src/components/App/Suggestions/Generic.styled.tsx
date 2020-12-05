import styled from 'styled-components'

import { H4 } from 'components/Text'

export const Container = styled.div`
  width: 0;
  height: calc(100vh - 80px);
  position: relative;
  display: flex;
  order: 1;
  transition: 0.3s;

  @media screen and (min-width: ${(props) => props.theme.screen.xl}) {
    width: 240px;
  }
`

export const SubContainer = styled.div`
  width: inherit;
  height: 100%;
`

export const List = styled.ul`
  width: inherit;
  height: 100%;
  position: fixed;
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0 ${(props) => props.theme.spacing.sm};
  list-style: none;

  @media screen and (max-width: ${(props) => props.theme.screen.lgl}) {
    display: none;
    padding: 0;
  }
`

export const Title = styled(H4)`
  cursor: pointer;
  user-select: none;
  pointer-events: none;
  border: 1px solid transparent;
  margin-bottom: ${(props) => props.theme.spacing.sm};
  padding: ${(props) => props.theme.spacing.xxs} 0 2px;
  font-family: ${(props) => props.theme.font.secondary};
  font-weight: 600;
  text-align: center;
  color: ${(props) => props.theme.colors.grey[500]};
  transition: 0.3s;

  &:hover {
    border-bottom-color: ${(props) => props.theme.colors.primary.main};
    color: ${(props) => props.theme.colors.primary.main};
  }

  @media screen and (max-width: ${(props) => props.theme.screen.lgl}) {
    display: none;
  }

  @media screen and (min-width: ${(props) => props.theme.screen.xl}) {
    pointer-events: auto;
  }
`

export const TextContainer = styled.div<{ expand?: boolean }>`
  width: 0;
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
  padding-left: ${(props) => props.theme.spacing[props.expand ? 'xs' : 'none']};
  transition: 0.3s;

  @media screen and (min-width: ${(props) => props.theme.screen.xl}) {
    flex: 1;
  }
`

export const Text = styled.span<{ bold?: boolean; small?: boolean; fade?: boolean }>`
  max-width: 100%;
  overflow: hidden !important;
  flex: 1;
  font-weight: ${(props) => (props.bold ? '600' : '400')};
  font-size: ${(props) => (props.small ? '0.7rem' : '0.95rem')};
  line-height: 20px;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: ${(props) => props.theme.colors.text[props.fade ? 'secondary' : 'primary']};
`
