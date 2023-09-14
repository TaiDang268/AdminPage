import { useContext, useEffect } from 'react'

import { getByParamsTopic } from '~/api'
import { Theme } from '~/hooks/useContext'
import { deleteAuthor, setDataAuthor } from '~/redux/features/AuthorSlice'
import { useAppDispatch, useAppSelector } from '~/redux/hooks'

import Action from '../common/Action'
import DeleteWarning from '../notification/DeleteWarning'

const AuthorTable = () => {
  const dispatch = useAppDispatch()
  const authorData = useAppSelector((state) => state.author.authors)
  const { toggle, setToggle, idDelete, setIdDelete } = useContext(Theme)

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
  const handleClickTrash = (id: string) => {
    setToggle(true)
    setIdDelete(id)
  }
  const handleDeleteAuthor = () => {
    dispatch(deleteAuthor(idDelete))
  }
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
                    <Action onDelete={() => handleClickTrash(item.id)} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {toggle && (
          <div className='fixed top-0 right-0'>
            <DeleteWarning handleDelete={handleDeleteAuthor} />
          </div>
        )}
      </div>
    </>
  )
}
export default AuthorTable
