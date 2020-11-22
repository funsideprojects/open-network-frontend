import React from 'react'

export const CookieEvents = () => {
  React.useEffect(() => {
    console.log('x', document.cookie)

    return () => {}
  }, [])

  return <React.Fragment />
}
