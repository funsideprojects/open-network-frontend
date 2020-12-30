/// <reference types="resize-observer-browser" />

import React from 'react'
import NotificationComponent from 'react-notifications-component'
import debounce from 'lodash/debounce'

import 'animate.css/animate.min.css'
import 'react-notifications-component/dist/theme.css'
import './messages.less'

const Component = () => {
  const prevHeight = React.useRef<{ [id: string]: number }>({})

  React.useLayoutEffect(() => {
    const bottomLeftContainer = document.querySelector('.notification-container--bottom-left')
    if (bottomLeftContainer) {
      const onResize = debounce((entries, ob) => {
        console.log('onResize -> entries', entries, ob)
        // console.log(prevHeight.current, bottomLeftContainer.scrollHeight)
        // prevHeight.current = bottomLeftContainer.scrollHeight
      }, 300)
      const observer = new ResizeObserver(onResize)
      const { length } = bottomLeftContainer.children

      for (let index = 0; index < length; index++) {
        observer.observe(bottomLeftContainer.children[index])
      }

      return () => {
        observer.unobserve(bottomLeftContainer)
      }
    }
  }, [])

  return <NotificationComponent />
}

export default Component
