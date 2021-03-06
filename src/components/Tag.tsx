import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { Close } from '@styled-icons/ionicons-outline/Close'

export enum TagColor {
  Danger = 'danger',
  Warning = 'warning',
  Success = 'success',
  Info = 'info',
  Default = 'default',
}

const TagComponent = styled.span<Partial<Props>>`
  user-select: none;
  width: ${(props) => (props.block ? '100%' : 'fit-content')};
  min-height: 22px;
  position: relative;
  display: inline-block;
  border-width: 1px;
  border-style: solid;
  border-color: ${(props) => props.theme.colors[props.tagColor!].dark};
  border-radius: ${(props) => props.theme.radius.sm};
  padding: 0 ${(props) => (props.closable ? 25 : 10)}px 0 ${(props) => (props.icon ? 25 : 10)}px;
  font-size: 0.8rem;
  line-height: 20px;
  color: ${(props) => props.theme.colors[props.tagColor === TagColor.Default ? 'black' : (props.tagColor as any)].dark};
  background-color: ${(props) => props.theme.colors[props.tagColor!].lighter};
  visibility: ${(props) => (props.visible ? 'visible' : 'hidden')};
  opacity: ${(props) => (props.visible ? 1 : 0)};
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

const Tag = ({ tagColor, onClose, children, ...restProps }: Props) => {
  return (
    <TagComponent {...restProps} tagColor={tagColor || TagColor.Default}>
      {restProps.icon}
      {children}
      {restProps.closable && (
        <Close className="icon-close" {...(typeof onClose === 'function' ? { onClick: onClose } : {})} />
      )}
    </TagComponent>
  )
}

const componentPropTypes = {
  children: PropTypes.node,
  visible: PropTypes.bool,
  tagColor: PropTypes.oneOf<TagColor>([
    TagColor.Danger,
    TagColor.Warning,
    TagColor.Success,
    TagColor.Info,
    TagColor.Default,
  ]),
  icon: PropTypes.node,
  block: PropTypes.bool,
  closable: PropTypes.bool,
  onClose: PropTypes.func,
}

Tag.propTypes = componentPropTypes
type Props = PropTypes.InferProps<typeof componentPropTypes>

export default Tag
