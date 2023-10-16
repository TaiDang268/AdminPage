import axios from 'axios'
import { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import Swal from 'sweetalert2'

import { baseUrl } from '~/rtk-query/baseUrl'
import { IUser } from '~/types/interfaces'

import { deleteErrorMess, deleteSuccessMess } from './toast-message'

const User = () => {
  const [data, setData] = useState<IUser[]>()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/users`)
        setData(response.data)
      } catch (error) {
        console.error('Error fetching data: ', error)
      }
    }

    fetchData()
  }, [])
  const handleClickDelete = (id: string) => {
    Swal.fire({
      title: 'Bạn chắc chứ?',
      text: `Sau khi đồng ý, nguời dùng sẽ bị xóa khỏi danh sách`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#186E25',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Đồng ý',
      cancelButtonText: 'Hủy'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${baseUrl}/users/${id}`)
          const response = await axios.get(`${baseUrl}/users`)
          setData(response.data)
          deleteSuccessMess()
        } catch (error) {
          console.error('Error fetching data: ', error)
          deleteErrorMess()
        }
      }
    })
  }

  return (
    <>
      <div className='w-full h-screen'>
        <div className='w-full p-4'>
          <p className='font-semibold text-[24px]'>Danh sách người dùng</p>
          <div className='w-full mt-3'>
            <table>
              <thead>
                <tr className='text-white bg-primary'>
                  <th className='th-checkbox'>
                    <input type='checkbox' />
                  </th>
                  <th className='w-[60px] '>ID</th>
                  <th className='w-[400px]'>Tên người dùng </th>
                  <th>Email </th>
                  <th>Địa chỉ</th>
                  <th className='w-[140px]'>Số điện thoại </th>
                  <th>Quyền </th>
                  <th>Thao tác </th>
                </tr>
              </thead>
              <tbody>
                {data?.map((item, index) => (
                  <tr key={index}>
                    <th>
                      <input type='checkbox' />
                    </th>
                    <td className='text-center'>{item?.id}</td>

                    <td>{item?.username}</td>
                    <td>{item?.email}</td>

                    <td>{item?.address}</td>

                    <td>{item?.phone}</td>

                    <td>{item?.role}</td>

                    <td className='w-[100px] text-center '>
                      {item?.role.toLowerCase() === 'admin' ? null : (
                        <button
                          className='bg-red-500 hover:bg-red-700 text-white  py-1 px-2 rounded-[8px] ml-2'
                          onClick={() => handleClickDelete(item?.id)}
                        >
                          Xóa
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  )
}
export default User
