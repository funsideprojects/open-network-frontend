import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Button } from 'antd'
import { ReloadOutlined } from '@ant-design/icons'

import Timer from 'components/Timer'

const CustomButton = styled(Button)`
  border-radius: ${(p) => p.theme.radius.lg};
  border: 1px solid ${(p) => p.theme.colors.border.light};
`

const ButtonReload = ({ renewData }) => {
  const [disabled, setDisabled] = useState(false)

  const onClick = () => {
    renewData()
    setDisabled(true)
  }

  const onFinish = () => {
    setDisabled(false)
  }

  return (
    <CustomButton style={{ width: '100%' }} disabled={disabled} onClick={onClick}>
      {!disabled ? <ReloadOutlined /> : <>Available again after {<Timer seconds={5} onFinish={onFinish} />} seconds</>}
    </CustomButton>
  )
}

ButtonReload.propTypes = {
  renewData: PropTypes.func.isRequired,
}

export default ButtonReload
