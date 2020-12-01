import React from 'react'
import { createPortal } from 'react-dom'

const Portal: React.FC<any> = ({ children }) => {
  const mountPoint = document.getElementById('portal-mountpoint')
  const element = document.createElement('div')

  React.useEffect(() => {
    if (mountPoint) {
      mountPoint.appendChild(element)

      return () => {
        mountPoint.removeChild(element)
      }
    }
  }, [mountPoint, element])

  return createPortal(children, element)
}

export default Portal
