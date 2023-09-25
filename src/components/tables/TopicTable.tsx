import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { Theme } from '~/hooks/useContext'
import { setDataTopic } from '~/redux/features/TopicSlice'
import { useAppDispatch, useAppSelector } from '~/redux/hooks'
import { useDeleteTopicMutation, useGetTopicQuery } from '~/rtk-query/topic.service'
import { ITopic } from '~/types/interfaces'

import Action from '../common/Action'
import DeleteWarning from '../notification/DeleteWarning'

const TopicTable = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const topicData = useAppSelector((state) => state.topic.topics)
  const { toggle, setToggle, setIdDelete, idDelete, perPage } = useContext(Theme)
  const { data: topicResponse } = useGetTopicQuery({ _limit: perPage })
  const [deleteTopic] = useDeleteTopicMutation()
  useEffect(() => {
    if (topicResponse) {
      dispatch(setDataTopic(topicResponse))
    }
  }, [dispatch, topicResponse])
  const handleClickTrash = (id: string) => {
    setIdDelete(id)
    setToggle(true)
  }
  const handleDeleteTopic = () => {
    deleteTopic(idDelete)
  }
  const handleClickEdit = (item: ITopic) => {
    navigate('create_topic', { state: item })
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
                    <Action onDelete={() => handleClickTrash(item.id)} onEdit={() => handleClickEdit(item)} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {toggle && (
          <div className='fixed top-0 right-0'>
            <DeleteWarning handleDelete={handleDeleteTopic} />
          </div>
        )}
      </div>
    </>
  )
}
export default TopicTable
