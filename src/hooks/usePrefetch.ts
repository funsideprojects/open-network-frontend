import React from 'react'
import { RouteProps, useLocation, matchPath } from 'react-router-dom'

export type RouteConfig = RouteProps & { relatedRoutes?: Array<() => Promise<any>> }

export const usePrefetch = (routeMap: Array<RouteConfig>, delayMs?: number) => {
  const location = useLocation()

  const preload = React.useCallback(() => {
    const correspRouteConfig = routeMap.find(({ path }) => {
      return matchPath(location.pathname, { path, exact: true, strict: true })
    })

    if (correspRouteConfig) {
      correspRouteConfig.relatedRoutes?.forEach((component) => {
        component()
          // .then(() => console.debug(component.name, 'prefetched'))
          .catch(console.debug)
      })
    }
  }, [routeMap, location.pathname])

  React.useEffect(() => {
    if (typeof delayMs === 'number') {
      const correspRouteConfig = routeMap.find(({ path }) =>
        matchPath(location.pathname, { path, exact: true, strict: true })
      )

      if (correspRouteConfig) {
        const timerId = setTimeout(() => {
          correspRouteConfig.relatedRoutes?.forEach((component) => {
            component()
              // .then(() => console.debug(component.name, 'prefetched'))
              .catch(console.debug)
          })
        }, delayMs)

        return () => {
          clearTimeout(timerId)
        }
      }
    }
  }, [delayMs, routeMap, location.pathname])

  return { preload }
}
