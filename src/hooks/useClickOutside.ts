import { useEffect, RefObject } from 'react'

/** React hook that detects click outside an element */
export const useClickOutside = (ref: RefObject<any>, handler: () => void) => {
  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      handler()
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, false)

    return () => {
      document.removeEventListener('click', handleClickOutside, false)
    }
  })
}
