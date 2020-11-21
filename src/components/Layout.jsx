import styled from 'styled-components'

export const Header = styled.header``

export const Nav = styled.nav``

export const Main = styled.div`
  width: 100%;
  max-width: 1140px;
  overflow-x: hidden;
  margin: 0 auto;
`

export const Section = styled.section``

export const Aside = styled.aside``

export const Footer = styled.footer``

/**
 * Container div for holding UI, using theme screen options
 *
 * @param {string} maxWidth
 * @param {string} padding
 * @param {boolean} bordered
 * @param {boolean} color
 */
export const Container = styled.div`
  width: 100%;
  max-width: ${(p) => p.maxWidth && p.theme.screen[p.maxWidth]};
  position: relative;
  border-radius: ${(p) => p.radius && p.theme.radius[p.radius]};
  margin: 0 auto;
  margin-top: ${(p) => (p.marginTop ? p.theme.spacing[p.marginTop] : 0)};
  padding: ${(p) => (p.padding ? `0 ${p.theme.spacing[p.padding]}` : `0 ${p.theme.spacing.sm}`)};
  z-index: ${(p) => p.zIndex && p.theme.zIndex[p.zIndex]};
  background-color: ${(p) => p.color && p.theme.colors[p.color]};
`

export const Content = styled.div`
  width: 100%;
  min-height: 500px;
  position: relative;
  margin: 0 auto;
  z-index: ${(p) => p.zIndex && p.theme.zIndex[p.zIndex]};

  @media (min-width: ${(p) => p.theme.screen.md}) {
    width: ${(p) => p.theme.screen.xs};
  }

  @media (min-width: ${(p) => p.theme.screen.lg}) {
    width: ${(p) => p.theme.screen.sm};
  }
`

/**
 * Adds margins to UI, using theme spacing options
 *
 * @param {string} top
 * @param {string} right
 * @param {string} bottom
 * @param {string} left
 * @param {boolean} inline, converts block element to inline block
 */
export const Spacing = styled.div`
  ${(p) => p.top && `margin-top: ${p.theme.spacing[p.top]}`};
  ${(p) => p.right && `margin-right: ${p.theme.spacing[p.right]}`};
  ${(p) => p.bottom && `margin-bottom: ${p.theme.spacing[p.bottom]}`};
  ${(p) => p.left && `margin-left: ${p.theme.spacing[p.left]}`};
  ${(p) => p.inline && `display: inline-block;`}
`

/**
 * Overlay, on top of the whole UI
 */
export const Overlay = styled.div`
  width: 100%;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: ${(p) => p.theme.zIndex.md};
  background-color: rgba(0, 0, 0, ${(p) => (p.transparency ? p.transparency : '0.8')});
`
