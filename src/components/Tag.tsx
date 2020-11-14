import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { X } from '@styled-icons/boxicons-regular'

const TagComponent = styled.span<Partial<TagProps>>`
  user-select: none;
  width: ${(props) => (props.block ? '100%' : 'fit-content')};
  height: auto;
  position: relative;
  display: ${(props) => (props.visible ? 'inline-block' : 'none')};
  border-width: 1px;
  border-style: solid;
  border-color: ${(props) => props.theme.colors[props.color!].dark};
  border-radius: ${(props) => props.theme.radius.sm};
  padding: 0 ${(props) => (props.closable ? 25 : 10)}px 0 ${(props) => (props.icon ? 25 : 10)}px;
  font-size: ${(props) => props.theme.font.size.xxs};
  line-height: 20px;
  color: ${(props) => props.theme.colors[props.color === 'default' ? 'black' : props.color!].dark};
  background-color: ${(props) => props.theme.colors[props.color!].lighter};
  transition: 0.3s;

  > svg {
    width: 20px;
    height: 100%;
    position: absolute;
    top: 0;
    transition: 0.3s;

    &:not([class*='icon-close']) {
      left: 5px;
    }

    &[class*='icon-close'] {
      cursor: pointer;
      right: 5px;

      &:hover {
        transform: scale(1.3);
      }
    }
  }
`

export const Tag: React.FC<TagProps> = ({ color, onClose, children, ...restProps }) => {
  return (
    <TagComponent {...restProps} color={color || 'default'}>
      {restProps.icon}
      {children}
      {restProps.closable ? (
        <X className="icon-close" {...(typeof onClose === 'function' ? { onClick: onClose } : {})} />
      ) : (
        <></>
      )}
    </TagComponent>
  )
}

const tagProps = {
  visible: PropTypes.bool,
  color: PropTypes.oneOf(['error', 'warning', 'success', 'info', 'default']),
  icon: PropTypes.node,
  block: PropTypes.bool,
  closable: PropTypes.bool,
  onClose: PropTypes.func,
}

Tag.propTypes = tagProps
type TagProps = PropTypes.InferProps<typeof tagProps>
