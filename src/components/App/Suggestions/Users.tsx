import React from 'react'
import { useQuery } from '@apollo/client'
import { Reload } from '@styled-icons/ionicons-outline'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

import { SUGGEST_USERS } from 'graphql/user'

import { Section, TitleContainer, Title, TitleButton, SectionBody } from './Generic.styled'
import ListItem from './User'

const Users = () => {
  const { loading, data, refetch } = useQuery(SUGGEST_USERS.gql, {
    fetchPolicy: 'no-cache',
    notifyOnNetworkStatusChange: true,
    variables: { except: [] },
  })

  const handleRenew = async () => {
    await refetch({ except: data.suggestUsers.map((user) => user.id) })
  }

  return (
    <Section>
      <TitleContainer>
        <Title>Users</Title>
        <TitleButton disabled={loading} onClick={handleRenew}>
          <Reload />
        </TitleButton>
      </TitleContainer>
      <SectionBody>
        <TransitionGroup component={null}>
          {data?.suggestUsers?.map((user, index) => (
            <CSSTransition
              appear
              unmountOnExit
              in={!loading}
              key={user.id}
              timeout={{
                enter: 500 + index * 100,
                exit: 200,
              }}
              classNames="suggested-user"
            >
              <ListItem itemIndex={index} user={user} />
            </CSSTransition>
          ))}
        </TransitionGroup>
      </SectionBody>
    </Section>
  )
}

export default Users
