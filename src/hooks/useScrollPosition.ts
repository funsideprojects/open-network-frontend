import React from 'react'
import debounce from 'lodash/debounce'

const isBrowser = typeof window !== 'undefined'

// ? Types
type GetScrollPositionArgs = {
  useWindow?: boolean
  element?: HTMLElement
}

type Position = {
  x: number
  y: number
}

type HookProps = GetScrollPositionArgs & {
  effect: (positions: { prevPosition: Position; currentPosition: Position }) => any
  waitMs?: number
}

// ? Helper function
function getScrollPosition({ element, useWindow }: GetScrollPositionArgs): Position {
  if (!isBrowser) return { x: 0, y: 0 }

  if (useWindow) {
    return { x: window.scrollX, y: window.scrollY }
  }

  const target = element ?? document.body
  const position = target.getBoundingClientRect()

  return { x: position.left, y: position.top }
}

// ? Hook
export const useScrollPosition = ({ element, useWindow, effect, waitMs = 0 }: HookProps) => {
  const prevPosition = React.useRef(getScrollPosition({ useWindow }))

  const callback = React.useCallback(() => {
    const currentPosition = getScrollPosition({ element, useWindow })
    effect({ prevPosition: prevPosition.current, currentPosition })
    prevPosition.current = currentPosition
  }, [effect, element, useWindow])

  React.useLayoutEffect(() => {
    const handleScroll = debounce(callback, waitMs)

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [callback, waitMs])
}
