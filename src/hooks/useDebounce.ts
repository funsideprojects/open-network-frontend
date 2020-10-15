import { useState, useEffect } from 'react'

/** React hook for debouncing */
export const useDebounce = (value: any, msDelay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, msDelay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, msDelay])

  return debouncedValue
}
