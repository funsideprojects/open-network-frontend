import styled from 'styled-components'

export const Container = styled.div`
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

export const TextContainer = styled.div<{ visible: boolean }>`
  width: 0;
  height: 100%;
  display: flex;
  flex-shrink: 1;
  flex-flow: column nowrap;
  margin-left: ${(props) => props.theme.spacing.xs};
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

export const Badge = styled.div<{ visible: boolean; count?: number }>`
  position: relative;
  display: flex;
  flex-shrink: 1;
  align-items: center;
  transform: scale(0);
  transform-origin: top left;
  transition: 0.3s, transform 0.2s ${(props) => (props.visible ? '0.1s' : '0s')};

  &::before {
    content: '${(props) => props.count ?? ''}';
    border-radius: ${(props) => props.theme.radius.lg};
    padding: 2px 4px;
    font-family: ${(props) => props.theme.font.secondary};
    font-size: 0.6rem;
    line-height: normal;
    text-align: center;
    color: ${(props) => props.theme.colors.white};
    background: ${(props) => props.theme.colors.error.dark};
  }

  @media screen and (min-width: ${(props) => props.theme.screen.lg}) {
    padding: 0 ${(props) => props.theme.spacing[props.visible ? 'xs' : 'none']};
    transform: scale(${(props) => (props.count && props.visible ? 1 : 0)});
  }
`
