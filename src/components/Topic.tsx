import { useState } from 'react'

import { searchByName, sortAZ, sortZA } from '~/api'
import { setDataTopic } from '~/redux/features/TopicSlice'
import { useAppDispatch } from '~/redux/hooks'

import Filter from './common/Filter'
import Pagination from './common/Pagination'
import TitleTable from './common/TitleTable'
import TopicTable from './tables/TopicTable'

const Topic = () => {
  const dispatch = useAppDispatch()
  const [valueInput, setValueInput] = useState<string>('')
  const handleOnClickSearch = async () => {
    try {
      const res = await searchByName('topics', valueInput)
      dispatch(setDataTopic(res))
    } catch (err) {
      console.log(err)
    }
  }
  const handleSortAZ = async () => {
    try {
      const res = await sortAZ('topics')
      dispatch(setDataTopic(res))
    } catch (err) {
      console.log(err)
    }
  }
  const handleSortZA = async () => {
    try {
      const res = await sortZA('topics')
      dispatch(setDataTopic(res))
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <>
      <div className='w-full h-screen'>
        <div className='w-full p-4'>
          <TitleTable title='Chủ đề' nameButton='Thêm chủ đề' navigateTo='create_topic' />
          <Filter
            setValueInput={setValueInput}
            onSearch={handleOnClickSearch}
            sortAZ={handleSortAZ}
            sortZA={handleSortZA}
          />
          <TopicTable />
          <Pagination pageCount={3} />
        </div>
      </div>
    </>
  )
}
export default Topic
