import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Card, Form, Input, Button, message } from 'antd'

import './index.scss'
import logo from '@/assets/logo.png'
import { fetchLogin } from '@/store/modules/user'

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const onFinish = async (values) => {
    await dispatch(fetchLogin(values))
    navigate('/')
    message.success('登录成功')
  }
  return (
    <div className='login'>
      <Card className='login-container'>
        <img
          className='login-logo'
          src={logo}
          alt=''
        />
        {/* 登录表单 */}
        <Form
          validateTrigger='onBlur'
          onFinish={onFinish}
        >
          <Form.Item
            name='mobile'
            rules={[
              {
                required: true,
                message: '请输入手机号',
              },
              {
                pattern: /^1[3-9]\d{9}$/,
                message: '请输入正确的手机号格式',
              },
            ]}
          >
            <Input
              size='large'
              placeholder='请输入手机号'
            />
          </Form.Item>
          <Form.Item
            name='code'
            rules={[
              {
                required: true,
                message: '请输入验证码',
              },
            ]}
          >
            <Input
              size='large'
              placeholder='请输入验证码'
            />
          </Form.Item>
          <Form.Item>
            <Button
              type='primary'
              htmlType='submit'
              size='large'
              block
            >
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Login
