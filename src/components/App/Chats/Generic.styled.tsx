import styled from 'styled-components'
import { FixedSizeList } from 'react-window'

export const Container = styled.div<{ expand?: boolean }>`
  width: 0;
  height: calc(100vh - 100px);
  position: relative;
  order: 2;
  transition: 0.3s;

  @media screen and (min-width: ${(props) => props.theme.screen.md}) {
    width: 80px;
  }

  @media screen and (min-width: ${(props) => props.theme.screen.lg}) {
    width: ${(props) => (props.expand ? '280px' : '80px')};
  }
`

export const SubContainer = styled.div`
  width: inherit;
`

export const FixedContainer = styled.div`
  width: inherit;
  height: calc(100vh - 123px);
  position: fixed;
  display: flex;
  flex-flow: column nowrap;
`

export const Title = styled.span<{ expand: boolean }>`
  cursor: pointer;
  user-select: none;
  pointer-events: none;
  max-width: 100%;
  display: flex;
  justify-content: center;
  border-radius: ${(props) => props.theme.radius.md};
  margin: 0 ${(props) => props.theme.spacing.sm} ${(props) => props.theme.spacing.xs};
  font-family: ${(props) => props.theme.font.secondary};
  font-weight: 600;
  font-size: 1rem;
  line-height: 20px;
  text-align: center;
  color: ${(props) => (props.expand ? props.theme.colors.primary.main : props.theme.colors.grey[500])};
  transition: 0.3s;

  &:hover {
    color: ${(props) => props.theme.colors.white};
    background: ${(props) => props.theme.colors.primary.light};
  }

  @media screen and (min-width: ${(props) => props.theme.screen.lg}) {
    pointer-events: auto;
  }
`

export const List = styled(FixedSizeList)`
  padding: ${(props) => props.theme.spacing.xs} ${(props) => props.theme.spacing.sm} 0;

  &::-webkit-scrollbar {
    display: none;
  }

  > div {
    position: relative;
  }

  @media screen and (max-width: ${(props) => props.theme.screen.mdl}) {
    padding: 0;
  }
`

export const Item = styled.div`
  cursor: pointer;
  width: 100%;
  height: 40px;
  display: flex;
  border-radius: ${(props) => props.theme.radius.xxl};
  transition: 0.3s;

  &:hover {
    color: ${(props) => props.theme.colors.white};
    background: ${(props) => props.theme.colors.primary.light};
  }
`

export const TextContainer = styled.div<{ expand?: boolean }>`
  width: 0;
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
  padding-left: ${(props) => props.theme.spacing[props.expand ? 'xs' : 'none']};
  color: inherit;
  transition: 0.3s, color 0s;

  @media screen and (min-width: ${(props) => props.theme.screen.lg}) {
    flex: 1;
  }
`

export const Text = styled.span<{ bold?: boolean; small?: boolean }>`
  max-width: 100%;
  overflow: hidden !important;
  flex: 1;
  font-weight: ${(props) => (props.bold ? '600' : '400')};
  font-size: ${(props) => (props.small ? '0.75rem' : '0.95rem')};
  line-height: 20px;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: inherit;
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
    border-radius: ${(props) => props.theme.radius.lg};
    padding: 1.5px 5px;
    font-family: ${(props) => props.theme.font.secondary};
    font-size: 0.6rem;
    line-height: normal;
    text-align: center;
    color: ${(props) => props.theme.colors.white};
    background: ${(props) => props.theme.colors.error.dark};
  }

  @media screen and (min-width: ${(props) => props.theme.screen.lg}) {
    padding: 0 ${(props) => props.theme.spacing[props.expand ? 'xs' : 'none']};
    transform: scale(${(props) => (props.count && props.expand ? 1 : 0)});
  }
`
