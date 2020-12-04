import React from 'react'
import PropTypes from 'prop-types'
import { useLazyQuery } from '@apollo/client'
import { useRecoilState } from 'recoil'
import { generatePath } from 'react-router-dom'

import { SCISpinner } from 'components/Loading'
import Avatar from 'components/Avatar'
import { Button } from 'components/Form'
import { SEARCH_USERS } from 'graphql/user'
import { appAtoms } from 'store'

import * as Routes from 'routes'

import {
  Container,
  Item,
  NoSearchResult,
  Link,
  Username,
  Text,
  Pagination,
  SCILeftArrowAlt,
  SCIRightArrowAlt,
} from './SearchResult.styled'

const SearchResult = ({ expand, toMessaging }) => {
  const [search, { loading, data, variables }] = useLazyQuery(SEARCH_USERS, {
    fetchPolicy: 'cache-first',
  })
  const [
    {
      searchQuery,
      offset,
      limit,
      result: { count, users },
    },
    setSearchResult,
  ] = useRecoilState(appAtoms.searchResultState)

  const onPageChange = (direction: number) => {
    return search({ variables: { searchQuery, skip: offset + direction, limit } })
  }

  React.useEffect(() => {
    if (!loading && variables && data) {
      setSearchResult((prevState) => ({
        ...prevState,
        offset: variables.skip,
        result: data.searchUsers,
      }))
    }
  }, [setSearchResult, loading, data, variables])

  if (!expand || typeof count === 'undefined' || typeof users === 'undefined') {
    return <React.Fragment />
  }

  if (users.length < 1) {
    return (
      <Container>
        <NoSearchResult>No search results.</NoSearchResult>
      </Container>
    )
  }

  const currentPage = offset / limit + 1
  const totalPages = Math.ceil(count / limit)

  return (
    <Container>
      {count > limit ? (
        <Pagination>
          <Button icon={SCILeftArrowAlt} disabled={currentPage === 1} onClick={() => onPageChange(-limit)} />
          <Text smaller>
            Displaying {offset + 1} - {currentPage === totalPages ? count : offset + limit} of {count}
          </Text>
          <Button icon={SCIRightArrowAlt} disabled={currentPage === totalPages} onClick={() => onPageChange(limit)} />
        </Pagination>
      ) : (
        <React.Fragment />
      )}

      {loading ? (
        <Item center>
          <SCISpinner />
        </Item>
      ) : (
        users.map((user) => (
          <Link
            key={user.id}
            to={
              toMessaging
                ? generatePath(Routes.MESSAGES, { userId: user.id })
                : generatePath(Routes.USER_PROFILE, { username: user.username })
            }
          >
            <Item>
              <Avatar image={user.image} username={user.username} />

              <Username>
                <Text bold>{user.fullName}</Text>
                <Text smaller fade>
                  @{user.username}
                </Text>
              </Username>
            </Item>
          </Link>
        ))
      )}
    </Container>
  )
}

SearchResult.propTypes = {
  expand: PropTypes.bool.isRequired,
  toMessaging: PropTypes.bool,
}

export default SearchResult
