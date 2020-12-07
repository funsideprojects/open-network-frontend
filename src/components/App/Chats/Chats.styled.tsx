import styled from 'styled-components'
import { FixedSizeList } from 'react-window'

export const Container = styled.section<{ expand?: boolean }>`
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
`

export const Title = styled.div<{ expand: boolean }>`
  cursor: pointer;
  user-select: none;
  pointer-events: none;
  max-width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: ${(props) => props.theme.radius.md};
  margin: 0 ${(props) => props.theme.spacing.sm} ${(props) => props.theme.spacing.sm};
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
  width: 100%;
  padding: 0 ${(props) => props.theme.spacing.sm};

  &::-webkit-scrollbar {
    display: none;
  }

  @media screen and (max-width: ${(props) => props.theme.screen.mdl}) {
    padding: 0;
  }

  > div {
    position: relative;
  }
`
