import styled from 'styled-components'
import { FixedSizeList } from 'react-window'

export const Container = styled.section`
  height: calc(100vh - 100px);
  position: relative;
  display: none;
  order: 1;

  @media screen and (min-width: ${(props) => props.theme.screen.xl}) {
    width: 230px;
    display: flex;
  }
`

export const SubContainer = styled.div`
  width: inherit;
`

export const FixedContainer = styled.div`
  width: inherit;
  height: calc(100vh - 100px);
  position: fixed;
`

export const Section = styled.div<{ expand: boolean; expandWidth: string }>`
  width: 100%;
  height: ${(props) => (props.expand ? props.expandWidth : '20px')};
  overflow-y: hidden;
  display: flex;
  flex-flow: column nowrap;
  margin-bottom: ${(props) => props.theme.spacing[props.expand ? 'xs' : 'sm']};
  padding: 0 ${(props) => props.theme.spacing.sm};
  transition: 0.3s;
`

export const TitleContainer = styled.div`
  height: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: ${(props) => props.theme.radius.md};
`

export const Title = styled.div<{ active: boolean }>`
  user-select: none;
  height: 100%;
  display: flex;
  align-items: center;
  font-family: ${(props) => props.theme.font.secondary};
  font-weight: 600;
  font-size: 1rem;
  text-align: center;
  color: ${(props) => (props.active ? props.theme.colors.primary.main : props.theme.colors.grey[500])};
  transition: 0.3s;

  @media screen and (max-width: ${(props) => props.theme.screen.lgl}) {
    display: none;
  }

  @media screen and (min-width: ${(props) => props.theme.screen.xl}) {
    pointer-events: auto;
  }
`

export const ButtonIcon = styled.div`
  cursor: pointer;
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: ${(props) => props.theme.radius.md};
  transition: 0.3s;
`

export const ButtonHint = styled(ButtonIcon)`
  width: 16px;
  height: 16px;
  display: inline-flex;
  border-radius: 50%;
  margin-left: ${(props) => props.theme.spacing.xxs};
  color: ${(props) => props.theme.colors.white};
  background: ${(props) => props.theme.colors.primary.main};
  transition: 0.3s;

  > svg {
    width: 12px;
    height: 12px;
  }
`

export const TitleButton = styled(ButtonIcon)`
  &:hover {
    color: ${(props) => props.theme.colors.white};
    background: ${(props) => props.theme.colors.primary.light};
  }

  > svg {
    width: 16px;
    height: 16px;
  }
`

export const SectionBody = styled.div`
  width: 100%;
  display: flex;
  flex: 1;
`

export const HorizontalList = styled(FixedSizeList)`
  width: 100%;
  margin: ${(props) => props.theme.spacing.sm} 0 ${(props) => props.theme.spacing.xs};

  &::-webkit-scrollbar {
    display: none;
  }

  > div {
    position: relative;
  }
`

export const HorizontalListItem = styled.div`
  cursor: pointer;
  width: 40px;
  height: 40px;
  margin-right: ${(props) => props.theme.spacing.xs};
`
