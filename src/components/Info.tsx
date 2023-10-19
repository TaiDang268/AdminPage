import { Button, Form, Input } from 'antd'
import axios from 'axios'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { useState } from 'react'
import { ToastContainer } from 'react-toastify'

import images from '~/assets/images'
import { baseUrl } from '~/rtk-query/baseUrl'

import { updateInfomationError, updateInfomationSuccess } from './toast-message'
import { storage } from '../config/firebase'
export default function Info() {
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
  let userObject: any
  const storedUser = localStorage.getItem('user')
  if (storedUser) {
    userObject = JSON.parse(storedUser)
  } else {
    console.log('Không tìm thấy thông tin người dùng trong localStorage')
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
    const updatedUser: any = {}
    values.image = imgUrl || values.image
    for (const key in userObject) {
      // eslint-disable-next-line no-prototype-builtins
      if (userObject.hasOwnProperty(key)) {
        updatedUser[key] = userObject[key]
      }
    }

    for (const key in values) {
      // eslint-disable-next-line no-prototype-builtins
      if (values.hasOwnProperty(key)) {
        updatedUser[key] = values[key] !== undefined ? values[key] : userObject[key]
      }
    }

    try {
      const res = await axios.patch(`${baseUrl}/users/${updatedUser.id}`, values)
      localStorage.setItem('user', JSON.stringify(res.data))
      await location.reload()
      updateInfomationSuccess()
    } catch (err) {
      console.log(err)
      updateInfomationError()
    }
  }
  return (
    <div
      className='h-screen bg-no-repeat bg-center flex justify-center items-center '
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
          <Form.Item name='email' label='E-mail'>
            <Input defaultValue={userObject?.email} disabled />
          </Form.Item>
          <Form.Item name='username' label='Họ tên'>
            <Input defaultValue={userObject?.username} />
          </Form.Item>
          <Form.Item name='role' label='Quyền'>
            <Input defaultValue={userObject?.role} disabled />
          </Form.Item>

          <Form.Item name='phone' label='Số điện thoại'>
            <Input defaultValue={userObject?.phone} />
          </Form.Item>
          <Form.Item name='address' label='Địa chỉ'>
            <Input defaultValue={userObject?.address} />
          </Form.Item>
          <Form.Item name='image' label='Ảnh'>
            <div className='flex  items-center'>
              <label htmlFor='inputImage' className='cursor-pointer'>
                <img src={imgUrl ? imgUrl : userObject?.image} className='w-12 h-12' />
              </label>
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
              <p>Click để tải ảnh</p>
            </div>
          </Form.Item>
          <div className='flex justify-around ml-10 mt-20'>
            <Form.Item style={{ display: 'flex', justifyContent: 'center' }}>
              <Button type='primary' htmlType='submit' style={{ backgroundColor: '#186E25' }}>
                Cập nhật
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
      <ToastContainer />
    </div>
  )
}
