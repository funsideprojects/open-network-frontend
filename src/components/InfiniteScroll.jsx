// import { memo, useCallback, useEffect, useMemo } from 'react'
// import PropTypes from 'prop-types'
// import { get, uniqBy } from 'lodash'

// import { HEADER_HEIGHT } from 'constants/Layout'

// /**
//  * Component that adds Infinite scroll functionality to UI
//  */
// const InfiniteScroll = memo(
//   ({ containerId = 'root', queryName, data, dataKey, dataLimit, fetchMore, variables, count, children }) => {
//     const renewData = useCallback(() => {
//       const renewLimit = (data.length || 0) + dataLimit

//       return fetchMore({
//         variables: { ...variables, limit: renewLimit <= 0 ? dataLimit : renewLimit },
//         updateQuery: (_previousQueryResult, { fetchMoreResult: _fetchMoreResult }) => {
//           if (!_fetchMoreResult) return _previousQueryResult
//           return _fetchMoreResult
//         },
//       })
//     }, [data, dataLimit, variables, fetchMore])

//     const handleScroll = useMemo(
//       () => async () => {
//         const loadMore = () => {
//           return fetchMore({
//             variables: { ...variables, skip: data.length },
//             updateQuery: (previousQueryResult, { fetchMoreResult }) => {
//               if (!fetchMoreResult) return previousQueryResult

//               if (fetchMoreResult[queryName].count !== previousQueryResult[queryName].count) {
//                 renewData()
//                 return previousQueryResult
//               }

//               const hasDupl = fetchMoreResult[queryName][dataKey].filter(({ id }) =>
//                 previousQueryResult[queryName][dataKey].some(({ id: _id }) => id === _id)
//               )

//               if (hasDupl.length) {
//                 renewData()

//                 return previousQueryResult
//               }

//               const previousData = get(previousQueryResult, `${queryName}.${dataKey}`)
//               const fetchMoreData = get(fetchMoreResult, `${queryName}.${dataKey}`)

//               return Object.assign({}, previousQueryResult, {
//                 [queryName]: {
//                   count: fetchMoreResult[queryName].count,
//                   [dataKey]: uniqBy([...previousData, ...fetchMoreData]),
//                 },
//               })
//             },
//           })
//         }

//         const windowHeight = window.innerHeight
//         const scrollTop = document.documentElement.scrollTop
//         const offsetHeight = document.getElementById(containerId).offsetHeight
//         const scrolled = windowHeight + scrollTop === offsetHeight + (containerId !== 'root' ? HEADER_HEIGHT : 0)

//         // Stop event listener if all the data has been loaded
//         if (data.length >= count) {
//           window.removeEventListener('scroll', handleScroll)
//           return
//         }

//         // Load more data if user has scrolled to bottom and if there's still data in db to display
//         if (scrolled) {
//           window.removeEventListener('scroll', handleScroll)
//           await loadMore()
//         }
//       },
//       [renewData, containerId, queryName, data.length, dataKey, count, fetchMore, variables]
//     )

//     useEffect(() => {
//       window.addEventListener('scroll', handleScroll)

//       return () => window.removeEventListener('scroll', handleScroll)
//     }, [handleScroll])

//     return children(data, renewData)
//   }
// )

// InfiniteScroll.propTypes = {
//   containerId: PropTypes.string,
//   queryName: PropTypes.string.isRequired,
//   data: PropTypes.array.isRequired,
//   dataKey: PropTypes.string.isRequired,
//   dataLimit: PropTypes.number.isRequired,
//   count: PropTypes.number.isRequired,
//   fetchMore: PropTypes.func.isRequired,
//   variables: PropTypes.object.isRequired,
//   children: PropTypes.func.isRequired,
// }

// export default InfiniteScroll

export default {}
