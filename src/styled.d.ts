import 'styled-components'
import { StyledComponent } from 'styled-components'

import theme from 'theme'

type Theme = typeof theme

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}

declare global {
  type GenericSC = StyledComponent<any, any>
}
