import axios from 'axios'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import images from '~/assets/images'

const Login = () => {
  const navigate = useNavigate()
  const { register, getValues } = useForm()
  const handleClickLogin = async () => {
    const value = getValues()
    console.log(value)
    try {
      const res = await axios.get(`http://localhost:3007/users/`)
      const users = res.data
      console.log(users)
      const foundUser = users.find((user: any) => user.email === value.email)
      console.log(foundUser)
      navigate('/write')
    } catch (err) {
      console.log(err)
    }
  }
  const handleClickLoginButton = () => {}
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
              <input className='h-[36px] w-full rounded-[25px] border border-[#d9d9d9] px-4' {...register('email')} />
            </div>
            <div className='my-2'>
              <p className='mb-1'>Mật khẩu</p>
              <input
                className='h-[36px] w-full rounded-[25px] border border-[#d9d9d9] px-4'
                {...register('password')}
              />
            </div>
            <div className='flex justify-between my-2'>
              <div className='flex'>
                <input type='checkbox' className='mr-3' />
                <p>Nhớ mật khẩu</p>
              </div>
              <div>
                <p>Quên mật khẩu</p>
              </div>
            </div>
            <div className='mt-7' onClick={handleClickLogin}>
              <button
                className='bg-[#F27024] rounded-[25px] h-[36px] w-full text-white font-bold'
                onClick={handleClickLoginButton}
              >
                Đăng nhập
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default Login
