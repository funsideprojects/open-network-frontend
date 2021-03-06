import styled from 'styled-components'

export const Container = styled.section<{ visible?: boolean }>`
  height: calc(100vh - 100px);
  position: relative;
  display: none;
  order: 1;

  @media screen and (min-width: ${(props) => props.theme.screen.xl}) {
    width: 230px;
    display: ${(props) => (props.visible ? 'flex' : 'none')};
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

export const Section = styled.div`
  width: 100%;
  overflow-y: hidden;
  display: flex;
  flex-flow: column nowrap;
  margin: 0 ${(props) => props.theme.spacing.xs};
  padding: 0 ${(props) => props.theme.spacing.sm};
  transition: 0.3s;
`

export const SectionHeader = styled.div`
  height: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: ${(props) => props.theme.radius.md};
`

export const Title = styled.div`
  user-select: none;
  height: 100%;
  display: flex;
  align-items: center;
  font-family: ${(props) => props.theme.font.secondary};
  font-weight: 600;
  font-size: 1rem;
  text-align: center;
  color: ${(props) => props.theme.colors.grey[500]};
  transition: 0.3s;

  @media screen and (min-width: ${(props) => props.theme.screen.xl}) {
    pointer-events: auto;
  }
`

export const TitleButton = styled.button`
  cursor: pointer;
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  outline: 0;
  border: 0;
  border-radius: ${(props) => props.theme.radius.md};
  padding: 0;
  color: ${(props) => props.theme.colors.grey[500]};
  background: transparent;
  transition: 0.3s;

  &:hover {
    color: ${(props) => props.theme.colors.white};
    background: ${(props) => props.theme.colors.primary.light};
  }

  &:disabled {
    cursor: not-allowed;
    color: ${(props) => props.theme.colors.white};
    background: ${(props) => props.theme.colors.grey[400]};
  }

  > svg {
    width: 16px;
    height: 16px;
  }
`

export const SectionBody = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  padding: ${(props) => props.theme.spacing.sm} 0;
`
