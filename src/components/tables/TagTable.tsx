import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { getByParamsTopic } from '~/api'
import { Theme } from '~/hooks/useContext'
import { deleteTag, setDataTag } from '~/redux/features/TagSlice'
import { useAppDispatch, useAppSelector } from '~/redux/hooks'
import { ITag } from '~/types/interfaces'

import Action from '../common/Action'
import DeleteWarning from '../notification/DeleteWarning'

const TagTable = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const tagData = useAppSelector((state) => state.tag.tags)
  const { toggle, setToggle, idDelete, setIdDelete, perPage } = useContext(Theme)
  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        const res = await getByParamsTopic('tags', { _page: 1, _limit: Number(perPage) })
        dispatch(setDataTag(res))
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu:', error)
      }
    }
    fetchDataAsync()
  }, [perPage])
  const handleClickTrash = (id: string) => {
    setToggle(true)
    setIdDelete(id)
  }

  const handleDeleteTag = () => {
    dispatch(deleteTag(idDelete))
  }
  const handleClickEdit = (item: ITag) => {
    navigate('create_tag', { state: item })
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
              <th>Tag</th>
              <th>Thao tác </th>
            </tr>
          </thead>
          <tbody>
            {tagData.map((item) => (
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
            <DeleteWarning handleDelete={handleDeleteTag} />
          </div>
        )}
      </div>
    </>
  )
}
export default TagTable
