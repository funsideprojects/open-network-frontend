import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

export const Link = styled(NavLink)<{ count?: number }>`
  display: block;
  margin: 0 ${(props) => props.theme.spacing.xs};
  text-decoration: none;
  color: ${(props) => props.theme.colors.grey[500]};
  transition: 0.3s;

  &:hover {
    color: ${(props) => props.theme.colors.primary.main};
  }

  &::before {
    content: '${(props) => props.count || ''}';
    min-width: ${(props) => (props.count ? '22px' : 0)};
    min-height: ${(props) => (props.count ? '18px' : 0)};
    position: absolute;
    top: -6px;
    right: -6px;
    border: 2px solid ${(props) => props.theme.colors.grey[200]};
    border-radius: ${(props) => props.theme.radius.lg};
    padding: ${(props) => (props.count ? '2px' : 0)};
    font-family: ${(props) => props.theme.font.secondary};
    font-size: 0.6rem;
    text-align: center;
    color: ${(props) => props.theme.colors.white};
    background: ${(props) => props.theme.colors.error.dark};
    transform: scale(${(props) => (props.count ? 1 : 0)});
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
  height: 24px;
  display: flex;
  align-items: center;
  padding: 0 5px;
  font-family: ${(props) => props.theme.font.secondary};
  font-size: 0.9rem;
  line-height: 100%;
`
