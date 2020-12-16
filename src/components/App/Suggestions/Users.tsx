import React from 'react'
import styled from 'styled-components'
import { useQuery } from '@apollo/client'
import { Reload } from '@styled-icons/ionicons-outline/Reload'
import { FileTray } from '@styled-icons/ionicons-outline/FileTray'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

import { SUGGEST_USERS } from 'graphql/user'

import { Section, TitleContainer, Title, TitleButton, SectionBody } from './Generic.styled'
import ListItem from './User'

const MessageContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
`

const Message = styled.p`
  font-size: ${(props) => props.theme.font.size.xxs};
`

const Users = () => {
  const { loading, data, refetch } = useQuery(SUGGEST_USERS.gql, {
    variables: { except: [] },
    fetchPolicy: 'no-cache',
    notifyOnNetworkStatusChange: true,
  })

  const handleRenew = async () => {
    // ! Bug when there're < 5 users left - `data.suggestUsers.map((user) => user.id)`
    await refetch({ except: [] })
  }

  return (
    <Section>
      <TitleContainer>
        <Title>Users</Title>
        <TitleButton disabled={loading || !data?.suggestUsers?.length} onClick={handleRenew}>
          <Reload />
        </TitleButton>
      </TitleContainer>
      <SectionBody>
        {data?.suggestUsers?.length ? (
          <TransitionGroup component={null}>
            {data.suggestUsers?.map((user, index) => (
              <CSSTransition
                appear
                unmountOnExit
                in={!loading}
                key={user.id}
                timeout={{
                  enter: 300 + index * 100,
                  exit: 200,
                }}
                classNames="suggested-user"
              >
                <ListItem itemIndex={index} user={user} />
              </CSSTransition>
            ))}
          </TransitionGroup>
        ) : (
          <MessageContainer>
            <FileTray />
            <Message>There's no suggestion left</Message>
          </MessageContainer>
        )}
      </SectionBody>
    </Section>
  )
}

export default Users
