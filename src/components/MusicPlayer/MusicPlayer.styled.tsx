import styled, { keyframes } from 'styled-components'

export const PlayerBar = styled.div`
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  align-items: center;
  padding: 0 ${(props) => props.theme.spacing.xxs};

  @media (min-width: ${(props) => props.theme.screen.lg}) {
    flex-flow: row nowrap;
  }
`

export const Controllers = styled.div`
  display: flex;
`

export const Button = styled.button<{ small?: boolean; active?: boolean }>`
  cursor: pointer;
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  outline: 0;
  border: 0;
  border-radius: 50%;
  margin: 0 ${(props) => props.theme.spacing.xxs};
  padding: 0 ${(props) => props.theme.spacing[props.small ? 'xxs' : 'none']};
  color: ${(props) => (props.active ? props.theme.colors.primary.main : props.theme.colors.grey[500])};
  background: transparent;
  transition: 0.3s;

  &:hover {
    color: ${(props) => props.theme.colors.primary.main};
  }

  > svg {
    width: ${(props) => (props.small ? 10 : 20)}px;
    height: ${(props) => (props.small ? 10 : 20)}px;
  }
`

const floatText = keyframes`
  to {
    transform: translate(-100%);
  }
`

export const SongNameContainer = styled.div`
  cursor: pointer;
  width: 100%;
  max-width: 100%;
  overflow-x: hidden;
  display: flex;
  order: -1;
  box-shadow: 8px 0 8px -8px ${(props) => props.theme.colors.primary.light} inset,
    -8px 0 8px -8px ${(props) => props.theme.colors.primary.light} inset;
  margin: 0 0 ${(props) => props.theme.spacing.xxs} 0;

  &:hover {
    > span {
      color: ${(props) => props.theme.colors.primary.main};
      animation-play-state: paused;
    }
  }

  @media (min-width: ${(props) => props.theme.screen.lg}) {
    order: 0;
    margin: 0 0 0 ${(props) => props.theme.spacing.xs};
  }
`

export const SongName = styled.span<{ isPlaying?: boolean }>`
  user-select: none;
  display: inline-block;
  padding-left: 100%;
  font-size: 0.8rem;
  white-space: nowrap;
  color: ${(props) => props.theme.colors.grey[600]};
  animation: ${floatText} 15s infinite linear;
  animation-play-state: ${(props) => (props.isPlaying ? 'running' : 'paused')};
  transition: 0.3s;
`
