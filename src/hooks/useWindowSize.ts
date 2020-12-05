import { useState, useEffect, useCallback } from 'react'
import debounce from 'lodash/debounce'

/**
 * React hook for detecting window resizing
 */
export const useWindowSize = () => {
  const isClient = typeof window === 'object'

  const getSize = useCallback(() => {
    return {
      width: isClient ? window.innerWidth : 0,
      height: isClient ? window.innerHeight : 0,
    }
  }, [isClient])

  const [windowSize, setWindowSize] = useState(getSize)

  useEffect(() => {
    if (!isClient) {
      return () => false
    }

    const onResize = () => {
      setWindowSize(getSize())
    }
    const debouncedOnResize = debounce(onResize, 1000)

    window.addEventListener('resize', debouncedOnResize)

    return () => window.removeEventListener('resize', debouncedOnResize)
  }, [getSize, isClient])

  return windowSize
}
