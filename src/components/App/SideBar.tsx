import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Globe } from '@styled-icons/typicons/Globe'
import { PlayCircle, PeopleCircle, Bookmark } from '@styled-icons/ionicons-outline'
import { PlusCircle } from '@styled-icons/boxicons-regular'

import logoImg from 'assets/images/logo.png'

import Image from 'components/Image'

import * as Routes from 'routes'

const Container = styled.ul`
  width: 80px;
  height: 100vh;
  position: sticky;
  top: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0;
  padding: ${(props) => props.theme.spacing.sm};
  background-color: ${(props) => props.theme.colors.grey[200]};
  list-style: none;
  transition: 0.3s;
`

const Item = styled.li`
  width: 40px;
  height: 40px;
  margin: ${(props) => props.theme.spacing.xs} 0;

  > a {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &:first-child {
    margin-top: 0;
    margin-bottom: ${(props) => props.theme.spacing.md};
  }

  &:not(:first-child) {
    overflow: hidden;
    border-radius: 50%;
    background: ${(props) => props.theme.colors.grey[200]};
    transition: 0.3s;

    > a {
      color: ${(props) => props.theme.colors.primary.main};
      transition: 0.4s;

      > svg {
        width: 24px !important;
        height: 24px !important;
      }
    }

    &:hover {
      background: ${(props) => props.theme.colors.primary.light};

      > a {
        color: ${(props) => props.theme.colors.white};
      }
    }
  }
`

const Divider = styled.div`
  width: 4px;
  height: 4px;
  border-radius: 4px;
  margin: ${(props) => props.theme.spacing.xs} 0;
  background: ${(props) => props.theme.colors.grey[500]};
`

const Logo = styled(Image)`
  width: 40px;
  height: 40px;
  position: relative;
  border-radius: ${(props) => props.theme.radius.lg};
`

const SideBar = () => {
  const items = [
    { to: Routes.HOME, component: <Logo src={logoImg} alt="x-logo" /> },
    { to: Routes.HOME, component: <Globe /> },
    { to: Routes.HOME, component: <PeopleCircle /> },
    'divider',
    { to: Routes.HOME, component: <PlayCircle /> },
    { to: Routes.HOME, component: <Bookmark /> },
    'divider',
    { to: Routes.HOME, component: <PlusCircle /> },
  ]

  return (
    <Container>
      {items.map((item, index) =>
        typeof item === 'string' ? (
          <Divider key={index} />
        ) : (
          <Item key={index}>
            <Link to={item.to}>{item.component}</Link>
          </Item>
        )
      )}
    </Container>
  )
}

export default SideBar
