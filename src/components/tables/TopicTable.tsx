import { useEffect, useState } from 'react'

import { getByParamsTopic } from '~/api'
import { deleteTopic, setDataTopic } from '~/redux/features/TopicSlice'
import { useAppDispatch, useAppSelector } from '~/redux/hooks'

import Action from '../common/Action'
import DeleteWarning from '../notification/DeleteWarning'

const TopicTable = () => {
  const dispatch = useAppDispatch()
  const topicData = useAppSelector((state) => state.topic.topics)
  const [showDeleteWarning, setShowDeleteWarning] = useState<boolean>(false)
  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        const res = await getByParamsTopic('topics', { _page: 1, _limit: 10 })
        dispatch(setDataTopic(res))
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu:', error)
      }
    }
    fetchDataAsync()
  }, [])
  const handleClickTrash = (id: string) => {
    dispatch(deleteTopic(id))
    setShowDeleteWarning(true)
    console.log(id)
  }
  const handleClickEdit = () => {}
  return (
    <>
      <div className='w-full mt-3'>
        <table>
          <thead>
            <tr className='text-white bg-primary'>
              <th className='th-checkbox'>
                <input type='checkbox' />
              </th>
              <th>Tên chủ đề </th>
              <th>Slug</th>
              <th>Số bài viết</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {topicData.map((item) => (
              <tr key={item.id}>
                <th>
                  <input type='checkbox' />
                </th>
                <td>{item.name}</td>
                <td>{item.slug}</td>
                <td>{item.quantity}</td>
                <td className='w-[120px]'>
                  <div className='flex justify-center'>
                    <Action onDelete={() => handleClickTrash(item.id)} onEdit={() => handleClickEdit()} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {showDeleteWarning && (
          <div className='fixed top-0 right-0'>
            <DeleteWarning />
          </div>
        )}
      </div>
    </>
  )
}
export default TopicTable
