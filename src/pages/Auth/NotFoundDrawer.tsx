import React from 'react'
import { useHistory } from 'react-router-dom'
import { Transition } from 'react-transition-group'

import Head from 'components/Head'
import NotFound from 'components/NotFound'

import * as Routes from 'routes'

import { Drawer } from './Generic.styled'

// ? Transition config
const tDuration = 300 // ? ms
const defaultStyle = {
  transition: `${tDuration}ms`,
  visibility: 'hidden',
}
const transitionStyles = {
  entering: { opacity: 0, top: '-45%', visibility: 'hidden' },
  entered: { opacity: 1, top: 0, visibility: 'visible' },
  exiting: { opacity: 0, top: '-45%', visibility: 'hidden' },
}

const NotFoundDrawer = () => {
  const history = useHistory()
  const [isMounted, setIsMounted] = React.useState(true)

  return (
    <>
      <Head title="Page Not Found" />

      <Transition
        appear
        unmountOnExit
        in={isMounted}
        timeout={{ enter: 0, exit: tDuration }}
        onExited={() => history.push(Routes.HOME)}
      >
        {(transitionState) => (
          <Drawer
            data-name="page-not-found-drawer"
            float="top"
            style={{ ...defaultStyle, ...transitionStyles[transitionState] }}
          >
            <NotFound navigate={() => setIsMounted(false)} />
          </Drawer>
        )}
      </Transition>
    </>
  )
}

export default NotFoundDrawer
