import { useState } from 'react'

import { searchByName, sortAZ, sortZA } from '~/api'
import { setDataTag } from '~/redux/features/TagSlice'
import { useAppDispatch } from '~/redux/hooks'

import Filter from './common/Filter'
import Pagination from './common/Pagination'
import TitleTable from './common/TitleTable'
import TagTable from './tables/TagTable'

const Tag = () => {
  const dispatch = useAppDispatch()
  const [valueInput, setValueInput] = useState<string>('')
  const handleOnClickSearch = async () => {
    try {
      const res = await searchByName('tags', valueInput)
      dispatch(setDataTag(res))
    } catch (err) {
      console.log(err)
    }
  }
  const handleSortAZ = async () => {
    try {
      const res = await sortAZ('tags')
      dispatch(setDataTag(res))
    } catch (err) {
      console.log(err)
    }
  }
  const handleSortZA = async () => {
    try {
      const res = await sortZA('tags')
      dispatch(setDataTag(res))
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <>
      <div className='w-full h-screen'>
        <div className='w-full p-4'>
          <TitleTable title='Tag' nameButton='Thêm tag' navigateTo='create_tag' />
          <Filter
            setValueInput={setValueInput}
            onSearch={handleOnClickSearch}
            sortAZ={handleSortAZ}
            sortZA={handleSortZA}
          />
          <TagTable />
          <Pagination pageCount={3} />
        </div>
      </div>
    </>
  )
}
export default Tag
