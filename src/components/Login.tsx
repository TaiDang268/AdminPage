import { yupResolver } from '@hookform/resolvers/yup'
import axios from 'axios'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'

import images from '~/assets/images'
import { Theme } from '~/hooks/useContext'
import routesPath from '~/routes/routesPath'

const Login = () => {
  const navigate = useNavigate()
  const { setIsLoggedIn } = useContext(Theme)
  const validationSchema = yup.object().shape({
    email: yup.string().required('Email là trường bắt buộc').email('Email không hợp lệ'),
    password: yup.string().required('Mật khẩu là trường bắt buộc')
  })

  const {
    register,
    getValues,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(validationSchema)
  })
  const handleClickLogin = async () => {
    const value = getValues()
    const acount = {
      email: value.email,
      password: value.password
    }
    try {
      const res = await axios.post('http://localhost:3007/login', acount)

      if (res.statusText == 'OK') {
        navigate(routesPath.posts)
        localStorage.setItem('isLoggedIn', 'true')
        localStorage.setItem('user', JSON.stringify(res.data.user))

        setIsLoggedIn(true)
      }
    } catch (err: any) {
      if (err.response.data === 'Cannot find user') {
        setError('email', { message: 'Không tồn tại tài khoản' })
      } else {
        setError('password', { message: 'Sai mật khẩu' })
      }
    }
  }
  return (
    <>
      <div
        className='w-screen h-screen bg-no-repeat bg-center flex justify-center items-center '
        style={{ backgroundImage: `url(${images.BackgroundLogin})` }}
      >
        <div className='w-[450px] h-[550px] rounded-[25px] bg-white  '>
          <div className='flex justify-center py-10'>
            <img src={images.LogoBattech} />
          </div>
          <div className='px-10'>
            <p className='font-bold text-[24px]'>Đăng nhập tài khoản </p>
            <div className='my-2'>
              <p className='mb-1'>Email</p>
              <input
                className='h-[36px] w-full rounded-[25px] border border-[#d9d9d9] px-4'
                {...register('email', { required: true })}
              />
              {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
            </div>
            <div className='my-2'>
              <p className='mb-1'>Mật khẩu</p>
              <input
                type='password'
                className='h-[36px] w-full rounded-[25px] border border-[#d9d9d9] px-4'
                {...register('password', { required: true })}
              />
              {errors.password && <p className='text-red-500 '>{errors.password.message}</p>}
            </div>
            <div className='flex justify-between my-2'>
              <div className='flex'>
                <input type='checkbox' className='mr-3' />
                <p>Nhớ mật khẩu</p>
              </div>
              <div>
                <a href='' className='text-blue-500'>
                  Quên mật khẩu
                </a>
              </div>
            </div>
            <div className='mt-7' onClick={handleSubmit(handleClickLogin)}>
              <button className='bg-[#F27024] rounded-[25px] h-[36px] w-full text-white font-bold'>Đăng nhập</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default Login
