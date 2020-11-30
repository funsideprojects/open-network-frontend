import React from 'react'

/** React hook for debouncing */
export const useDebounce = (value: any, msDelay: number) => {
  const [debouncedValue, setDebouncedValue] = React.useState(value)

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, msDelay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, msDelay])

  return debouncedValue
}
