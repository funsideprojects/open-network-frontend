import styled from 'styled-components'

export const Container = styled.ul`
  width: 80px;
  height: 100vh;
  position: sticky;
  top: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0;
  padding: ${(props) => props.theme.spacing.sm};
  background-color: ${(props) => props.theme.colors.grey[200]};
  list-style: none;
  transition: 0.3s;
`

export const Item = styled.li`
  user-select: none;
  width: 40px;
  height: 40px;
  margin: ${(props) => props.theme.spacing.xs} 0;

  > a {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &:first-child {
    margin-top: 0;
    margin-bottom: ${(props) => props.theme.spacing.md};
  }

  &:not(:first-child) {
    overflow: hidden;
    border-radius: 50%;
    background: ${(props) => props.theme.colors.grey[200]};
    transition: 0.3s;

    > a {
      color: ${(props) => props.theme.colors.grey[500]};
      transition: 0.4s;

      &.is-active {
        color: ${(props) => props.theme.colors.primary.main};
      }

      > svg {
        width: 24px !important;
        height: 24px !important;
      }
    }

    &:hover {
      > a {
        color: ${(props) => props.theme.colors.primary.main};
      }
    }
  }
`

export const Divider = styled.div`
  width: 4px;
  height: 4px;
  border-radius: 4px;
  margin: ${(props) => props.theme.spacing.xs} 0;
  background: ${(props) => props.theme.colors.grey[500]};
`
