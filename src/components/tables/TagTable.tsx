import { useEffect } from 'react'

import { getByParamsTopic } from '~/api'
import { setDataTag } from '~/redux/features/TagSlice'
import { useAppDispatch, useAppSelector } from '~/redux/hooks'

import Action from '../common/Action'

const TagTable = () => {
  const dispatch = useAppDispatch()
  const tagData = useAppSelector((state) => state.tag.tags)
  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        const res = await getByParamsTopic('tags', { _page: 1, _limit: 10 })
        dispatch(setDataTag(res))
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
              <th>Tag</th>
              <th>Thao tác </th>
            </tr>
          </thead>
          <tbody>
            {tagData.map((item) => (
              <tr>
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
export default TagTable
