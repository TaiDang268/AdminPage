import { useEffect } from 'react'

import { getByParamsTopic } from '~/api'
import { setDataAuthor } from '~/redux/features/AuthorSlice'
import { useAppDispatch, useAppSelector } from '~/redux/hooks'

import Action from '../common/Action'

const AuthorTable = () => {
  const dispatch = useAppDispatch()
  const authorData = useAppSelector((state) => state.author.authors)
  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        const res = await getByParamsTopic('authors', { _page: 1, _limit: 10 })
        dispatch(setDataAuthor(res))
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu:', error)
      }
    }
    fetchDataAsync()
  }, [])
  return (
    <>
      <div className='w-full mt-3'>
        <table>
          <thead>
            <tr className='text-white bg-primary'>
              <th className='th-checkbox'>
                <input type='checkbox' />
              </th>
              <th>Tên tác giả </th>

              <th>Thao tác </th>
            </tr>
          </thead>

          <tbody>
            {authorData.map((item) => (
              <tr key={item.id}>
                <th>
                  <input type='checkbox' />
                </th>
                <td>{item.name}</td>
                <td className='w-[120px]'>
                  <div className='flex justify-center'>
                    <Action />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
export default AuthorTable
