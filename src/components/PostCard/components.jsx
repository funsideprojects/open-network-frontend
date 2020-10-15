import styled from 'styled-components'

import { Button } from 'components/Form'

export const StyledButton = styled(Button)`
  width: 48%;
  border-radius: ${(p) => p.theme.radius.md};
  background: ${(p) => (p.active ? p.theme.colors.primary.lighter : 'transparent')};
  ${(p) => p.active && `color: ${p.theme.colors.white};`}
`
