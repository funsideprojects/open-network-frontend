import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Form, Input, Button } from 'antd'

export const WrapperForm = styled.div``

export const Title = styled.h3`
  width: 100%;
  text-align: center;
  margin-bottom: 36px;
`

export const Description = styled.p`
  width: 320px;
  text-align: center;
  margin-top: 12px;
  font-size: ${(p) => p.theme.font.size.xxs};
`

export const CustomForm = styled(Form)`
  width: 320px;
`

export const CustomFormItem = styled(Form.Item)`
  position: relative;
  .ant-form-item-control-input-content {
    display: flex;
    justify-content: flex-end;
  }

  .ant-form-item-explain > div {
    display: none;
  }
`

export const CustomInput = styled(Input)`
  border-radius: 999px;
  max-height: 40px;
`

export const LoginButton = styled(Button)`
  width: 100%;
  height: 40px;
  border-radius: 999px;
  background-color: ${(p) => p.theme.colors.primary.main};
  transition: all 0.4s;
  border: 0;

  &:hover {
    background-color: ${(p) => p.theme.colors.primary.light};
  }

  &:focus {
    background-color: ${(p) => p.theme.colors.primary.main};
  }
`

export const WrapperNavigation = styled.div`
  display: flex;
  justify-content: center;

  span {
    color: ${(p) => p.theme.colors.grey[600]};
    margin-right: 12px;
  }
`

export const BulkHead = styled.div`
  width: 1px;
  height: 20px;
  background-color: ${(p) => p.theme.colors.grey[600]};
  margin: 0px 12px;
`

export const CustomLink = styled(Link)`
  &:hover {
    text-decoration: underline !important;
  }
`
