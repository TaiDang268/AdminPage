import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { Theme } from '~/hooks/useContext'
import { setDataAuthor } from '~/redux/features/AuthorSlice'
import { useAppDispatch, useAppSelector } from '~/redux/hooks'
import { useDeleteAuthorMutation, useGetAuthorQuery } from '~/rtk-query/author.service'
import { IAuthor } from '~/types/interfaces'

import Action from '../common/Action'
import DeleteWarning from '../notification/DeleteWarning'

const AuthorTable = () => {
  const { perPage } = useContext(Theme)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const authorData = useAppSelector((state) => state.author.authors)
  const { data: authorResponse } = useGetAuthorQuery({ _limit: perPage })
  const [deleteAuthor1] = useDeleteAuthorMutation()
  const { toggle, setToggle, idDelete, setIdDelete } = useContext(Theme)
  useEffect(() => {
    if (authorResponse) {
      dispatch(setDataAuthor(authorResponse))
    }
  }, [dispatch, authorResponse])
  const handleClickTrash = (id: string) => {
    setToggle(true)
    setIdDelete(id)
  }
  const handleDeleteAuthor = () => {
    deleteAuthor1(idDelete)
  }
  const handleClickEdit = (item: IAuthor) => {
    navigate('create_author', { state: item })
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
                    <Action onDelete={() => handleClickTrash(item.id)} onEdit={() => handleClickEdit(item)} />
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
