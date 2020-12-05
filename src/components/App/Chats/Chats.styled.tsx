import styled from 'styled-components'

import { H4 } from 'components/Text'

export const Container = styled.div<{ expand?: boolean }>`
  width: 0;
  height: calc(100vh - 80px);
  position: relative;
  right: 0;
  display: flex;
  order: 2;
  transition: 0.3s;

  @media screen and (min-width: ${(props) => props.theme.screen.lg}) {
    width: 80px;
  }

  @media screen and (min-width: ${(props) => props.theme.screen.xl}) {
    width: ${(props) => (props.expand ? '280px' : '80px')};
  }
`

export const ListContainer = styled.div`
  width: inherit;
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

  @media screen and (min-width: ${(props) => props.theme.screen.xl}) {
    pointer-events: auto;
  }
`

export const Item = styled.li`
  cursor: pointer;
  width: 100%;
  height: 40px;
  display: flex;
  margin: 0 0 ${(props) => props.theme.spacing.sm} 0;
  transition: 0.3s;
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

export const Badge = styled.div<{ expand?: boolean; count?: number }>`
  position: relative;
  display: flex;
  align-items: center;
  transform: scale(0);
  transform-origin: top left;
  transition: 0.3s, transform 0.2s ${(props) => (props.expand ? '0.1s' : '0s')};

  &::before {
    content: '${(props) => props.count ?? ''}';
    border: 2px solid ${(props) => props.theme.colors.grey[200]};
    border-radius: ${(props) => props.theme.radius.lg};
    padding: 1.5px 5px;
    font-family: ${(props) => props.theme.font.secondary};
    font-size: 0.6rem;
    line-height: normal;
    text-align: center;
    color: ${(props) => props.theme.colors.white};
    background: ${(props) => props.theme.colors.error.dark};
  }

  @media screen and (min-width: ${(props) => props.theme.screen.xl}) {
    padding-left: ${(props) => props.theme.spacing[props.expand ? 'xs' : 'none']};
    transform: scale(${(props) => (props.count && props.expand ? 1 : 0)});
  }
`
