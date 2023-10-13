import { Button, Form, Input } from 'antd'
import axios from 'axios'
import { Link } from 'react-router-dom'

import images from '~/assets/images'
import { baseUrl } from '~/rtk-query/baseUrl'
export default function Register() {
  const [form] = Form.useForm()
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 }
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 }
    }
  }
  const onFinish = async (values: any) => {
    console.log('Received values of form: ', values)
    values.role = 'User'
    try {
      const res = await axios.post(`${baseUrl}/register`, values)
      console.log(res)
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <div
      className='w-screen h-screen bg-no-repeat bg-center flex justify-center items-center '
      style={{ backgroundImage: `url(${images.BackgroundLogin})` }}
    >
      <div className='w-[450px] h-[550px] rounded-[25px] bg-white  pr-14 pt-10 '>
        <Form
          {...formItemLayout}
          form={form}
          name='register'
          onFinish={onFinish}
          style={{ maxWidth: 600 }}
          scrollToFirstError
        >
          <Form.Item
            name='email'
            label='E-mail'
            rules={[
              {
                type: 'email',
                message: 'Không đúng định dạng E-mail!'
              },
              {
                required: true,
                message: 'Không được để trống trường E-mail!'
              }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name='username'
            label='Họ tên'
            rules={[
              {
                required: true,
                message: 'Không được để trống trường Username!'
              }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name='password'
            label='Mật khẩu'
            rules={[
              {
                required: true,
                message: 'Không được để trống trường password!'
              }
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>
          <Form.Item name='phone' label='Số điện thoại'>
            <Input />
          </Form.Item>
          <Form.Item name='address' label='Địa chỉ'>
            <Input />
          </Form.Item>
          <Form.Item name='image' label='Ảnh'>
            <Input />
          </Form.Item>
          <div className='flex justify-around ml-10 mt-20'>
            <Form.Item style={{ display: 'flex', justifyContent: 'center' }}>
              <Link to='/login'>
                <Button type='primary' htmlType='submit' style={{ backgroundColor: '#F27024' }}>
                  Đăng nhập
                </Button>
              </Link>
            </Form.Item>
            <Form.Item style={{ display: 'flex', justifyContent: 'center' }}>
              <Button type='primary' htmlType='submit' style={{ backgroundColor: '#186E25' }}>
                Đăng ký
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </div>
  )
}
