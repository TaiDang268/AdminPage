import axios from 'axios'
import { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'

import { baseUrl } from '~/rtk-query/baseUrl'
import { IPosts } from '~/types/interfaces'

const ApprovePost = () => {
  const [data, setData] = useState<IPosts[]>()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/postApprove`)
        setData(response.data)
      } catch (error) {
        console.error('Error fetching data: ', error)
      }
    }

    fetchData()
  }, [])
  const handleClickDelete = async (id: string) => {
    try {
      await axios.delete(`${baseUrl}/postApprove/${id}`)
      const response = await axios.get(`${baseUrl}/postApprove`)
      setData(response.data)
    } catch (error) {
      console.error('Error fetching data: ', error)
    }
  }
  const handleClickOK = async ({ id, ...item }: IPosts) => {
    try {
      await axios.post(`${baseUrl}/posts`, item)
      await axios.delete(`${baseUrl}/postApprove/${id}`)
      const response = await axios.get(`${baseUrl}/postApprove`)
      setData(response.data)
    } catch (error) {
      console.error('Error fetching data: ', error)
    }
  }
  return (
    <>
      <div className='w-full h-screen'>
        <div className='w-full p-4'>
          <p className='font-semibold text-[24px]'>Danh sách phê duyệt</p>
          <div className='w-full mt-3'>
            <table>
              <thead>
                <tr className='text-white bg-primary'>
                  <th className='th-checkbox'>
                    <input type='checkbox' />
                  </th>
                  <th className='w-[60px] '>ID</th>
                  <th className='w-[400px]'>Tên bài viết </th>
                  <th>Mô tả </th>
                  <th>Tác giả </th>
                  <th>Chủ đề </th>
                  <th className='w-[140px]'>Ngày đăng bài </th>
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

                    <td>{item?.name}</td>
                    <td>{item?.description}</td>

                    <td>{item?.author}</td>

                    <td>{item?.category}</td>

                    <td>{item?.date}</td>

                    <td className='w-[100px]  '>
                      <button
                        className='bg-green-500 hover:bg-green-700 text-white  py-1 px-2 rounded-[8px]'
                        onClick={() => handleClickOK(item)}
                      >
                        OK
                      </button>
                      <button
                        className='bg-red-500 hover:bg-red-700 text-white  py-1 px-2 rounded-[8px] ml-2'
                        onClick={() => handleClickDelete(item?.id)}
                      >
                        Xóa
                      </button>
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
export default ApprovePost
