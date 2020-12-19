import React from 'react'
import styled from 'styled-components'
import { useQuery } from '@apollo/client'
import { Reload } from '@styled-icons/ionicons-outline/Reload'
import { FileTray } from '@styled-icons/ionicons-outline/FileTray'
import { TransitionGroup, Transition } from 'react-transition-group'

import { LoadingIndicator } from 'components/Loading'
import { SUGGEST_USERS } from 'graphql/user'

import { Section, SectionHeader, Title, TitleButton, SectionBody } from './Generic.styled'
import User from './User'

const ListItemContainer = styled.div<{ delay: number }>`
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${(props) => props.theme.spacing.xs};
  transition-delay: ${(props) => props.delay}ms;

  &:last-child {
    margin-bottom: 0;
  }
`

const MessageContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
`

const Message = styled.p`
  font-size: ${(props) => props.theme.font.size.xxs};
`

// ? Transition config
const baseTransitionDuration = 200
const defaultStyle = { transition: `${baseTransitionDuration}ms` }
const transitionStyles = {
  entering: { display: 'flex', opacity: 0, transform: 'translateY(20px)' },
  entered: { display: 'flex', opacity: 1, transform: 'translateY(0)' },
  exiting: { display: 'none' },
  exited: { display: 'none' },
}

const Component = () => {
  const { loading, data, refetch } = useQuery(SUGGEST_USERS.gql, {
    variables: { except: [] },
    fetchPolicy: 'no-cache',
    notifyOnNetworkStatusChange: true,
  })

  const handleRenew = async () => {
    await refetch({ except: data.suggestUsers.map((user) => user.id) })
  }

  return (
    <Section>
      <SectionHeader>
        <Title>Users</Title>
        <TitleButton disabled={loading || !data?.suggestUsers?.length} onClick={handleRenew}>
          <Reload />
        </TitleButton>
      </SectionHeader>

      <SectionBody>
        {data?.suggestUsers?.length ? (
          <TransitionGroup component={null}>
            {data.suggestUsers?.map((user, index) => {
              const transitionDelay = baseTransitionDuration + index * 100

              return (
                <Transition
                  appear
                  unmountOnExit
                  in={!user.id}
                  key={user.id}
                  timeout={{ enter: transitionDelay, exit: 0 }}
                >
                  {(transitionState) => {
                    return (
                      <ListItemContainer
                        delay={transitionDelay}
                        style={{ ...defaultStyle, ...transitionStyles[transitionState] }}
                      >
                        <User {...user} />
                      </ListItemContainer>
                    )
                  }}
                </Transition>
              )
            })}
          </TransitionGroup>
        ) : (
          <MessageContainer>
            {loading ? (
              <LoadingIndicator />
            ) : (
              <React.Fragment>
                <FileTray />
                <Message>There's no suggestion left</Message>
              </React.Fragment>
            )}
          </MessageContainer>
        )}
      </SectionBody>
    </Section>
  )
}

export default Component
