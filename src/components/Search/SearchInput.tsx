import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import debounce from 'lodash/debounce'
import { useSetRecoilState, useResetRecoilState } from 'recoil'
import { useLazyQuery } from '@apollo/client'
import { SearchAlt, RightArrowAlt, LeftArrowAlt } from '@styled-icons/boxicons-regular'

import { Input } from 'components/Form'
import { SCISpinner } from 'components/Loading'
import { SEARCH_USERS } from 'graphql/user'
import { appAtoms } from 'store'

const SCInput = styled(Input)`
  border-radius: ${(props) => props.theme.radius.xxl};
  background: ${(props) => props.theme.colors.grey[300]};
`

const SCISearchAlt = styled(SearchAlt)``
const SCIRightArrowAlt = styled(RightArrowAlt)``
const SCILeftArrowAlt = styled(LeftArrowAlt)``

const SearchInput = ({ expand, setExpand }: Props) => {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const setSearchResult = useSetRecoilState(appAtoms.searchResultState)
  const resetSearchResult = useResetRecoilState(appAtoms.searchResultState)
  const [search, { loading, data, variables }] = useLazyQuery(SEARCH_USERS, { fetchPolicy: 'cache-first' })

  const handleInputChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const searchQuery = target.value.trim()

    if (searchQuery) {
      return search({ variables: { searchQuery, skip: 0, limit: 5 } })
    } else {
      resetSearchResult()
    }
  }

  React.useEffect(() => {
    if (!loading && variables && data) {
      setSearchResult((prevState) => ({
        ...prevState,
        searchQuery: variables.searchQuery,
        offset: variables.skip,
        result: data.searchUsers,
      }))

      inputRef.current?.focus()
    }
  }, [setSearchResult, loading, data, variables])

  return (
    <SCInput
      name="search"
      placeholder={expand ? 'Looking for something?' : 'Search'}
      ref={inputRef}
      hasPrefix={loading ? SCISpinner : SCISearchAlt}
      hasSuffix={expand ? SCILeftArrowAlt : SCIRightArrowAlt}
      onFocus={() => setExpand(true)}
      disabled={loading}
      onChange={debounce(handleInputChange, 500)}
    />
  )
}

const componentPropTypes = {
  expand: PropTypes.bool.isRequired,
  setExpand: PropTypes.func.isRequired,
}

SearchInput.propTypes = componentPropTypes
type Props = PropTypes.InferProps<typeof componentPropTypes>

export default SearchInput
