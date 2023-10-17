import { Button, Form, Input } from 'antd'
import axios from 'axios'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import images from '~/assets/images'
import { baseUrl } from '~/rtk-query/baseUrl'

import { registerError, registerSuccess } from './toast-message'
import { storage } from '../config/firebase'

export default function Register() {
  const [form] = Form.useForm()
  const [imgUrl, setImgUrl] = useState('')

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

  const handleSelectImage = async (file: File | null) => {
    if (!file) return
    const imageRef = ref(storage, `files/${file.name}`)
    await uploadBytes(imageRef, file).then(() => {})

    await getDownloadURL(imageRef).then((url) => {
      setImgUrl(url)
    })
  }
  const onFinish = async (values: any) => {
    values.role = 'User'
    values.image =
      imgUrl || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSktK4jzhODqE-okFjhhHyxhvDPmbrrFdpIhg&usqp=CAU'

    try {
      await axios.post(`${baseUrl}/register`, values)
      registerSuccess()
    } catch (err) {
      console.log(err)
      registerError()
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
                message: 'Không được để trống trường họ tên!'
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
                message: 'Không được để trống trường mật khẩu !'
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
            <div className='flex  items-center'>
              <div className='hidden'>
                <input
                  id='inputImage'
                  type='file'
                  onChange={(e) => {
                    if (e.target.files) {
                      handleSelectImage(e.target.files[0])
                    }
                  }}
                />
              </div>
              <label htmlFor='inputImage' className='cursor-pointer'>
                <img
                  src={
                    imgUrl
                      ? imgUrl
                      : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSktK4jzhODqE-okFjhhHyxhvDPmbrrFdpIhg&usqp=CAU'
                  }
                  className='w-12 h-12'
                />
              </label>
            </div>
          </Form.Item>
          <div className='flex justify-around ml-10 mt-20'>
            <Form.Item style={{ display: 'flex', justifyContent: 'center' }}>
              <Link to='/login'>
                <Button style={{ backgroundColor: '#F27024' }}>Đăng nhập</Button>
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
      <ToastContainer />
    </div>
  )
}
