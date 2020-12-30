import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

export const Container = styled.div<{ rising: boolean }>`
  width: 100%;
  height: 80px;
  position: sticky;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 20px 15px -20px ${(props) => (props.rising ? props.theme.colors.grey[400] : 'transparent')};
  padding: 0 ${(props) => props.theme.spacing.sm};
  z-index: ${(props) => props.theme.zIndex.md};
  background-color: ${(props) => props.theme.colors.grey[props.rising ? 200 : 200]};
  transition: 0.3s;
`

export const HeaderItems = styled.div<{ side: 'start' | 'center' | 'end' }>`
  height: 100%;
  position: relative;
  display: flex;
  flex: auto;
  justify-content: ${(props) => (props.side === 'center' ? 'center' : `flex-${props.side}`)};
  align-items: center;
`

export const Link = styled(NavLink)<{ badge?: number }>`
  position: relative;
  display: block;
  padding: 0 ${(props) => props.theme.spacing.xs};
  text-decoration: none;
  color: ${(props) => props.theme.colors.grey[500]};
  transition: 0.3s;

  &:first-child {
    padding-left: 0;
  }

  &:hover {
    color: ${(props) => props.theme.colors.primary.main};
  }

  &::before {
    content: '${(props) => (props.badge ? (props.badge > 99 ? '99+' : props.badge) : '')}';
    min-width: ${(props) => (props.badge ? '22px' : 0)};
    position: absolute;
    top: -4px;
    right: 0;
    border: 2px solid ${(props) => props.theme.colors.grey[200]};
    border-radius: ${(props) => props.theme.radius.lg};
    padding: ${(props) => (props.badge ? '2px 3px' : 0)};
    font-family: ${(props) => props.theme.font.secondary};
    font-size: 0.6rem;
    line-height: normal;
    text-align: center;
    color: ${(props) => props.theme.colors.white};
    background: ${(props) => props.theme.colors.error.dark};
    transform: scale(${(props) => (props.badge ? 1 : 0)});
    transition: 0.3s;
  }

  &.is-active {
    color: ${(props) => props.theme.colors.primary.main};
  }

  > svg {
    width: 24px;
    height: 24px;
  }
`

export const Text = styled.div`
  user-select: none;
  height: 24px;
  display: flex;
  align-items: center;
  padding: 0 5px;
  font-family: ${(props) => props.theme.font.secondary};
  font-size: 0.9rem;
  line-height: 100%;
`
