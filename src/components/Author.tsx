import { useState } from 'react'

import { searchByName, sortAZ, sortZA } from '~/api'
import { setDataAuthor } from '~/redux/features/AuthorSlice'
import { useAppDispatch } from '~/redux/hooks'

import Filter from './common/Filter'
import Pagination from './common/Pagination'
import TitleTable from './common/TitleTable'
import AuthorTable from './tables/AuthorTable'

const Author = () => {
  const dispatch = useAppDispatch()

  const [valueInput, setValueInput] = useState<string>('')
  const handleOnClickSearch = async () => {
    try {
      const res = await searchByName('authors', valueInput)
      dispatch(setDataAuthor(res))
    } catch (err) {
      console.log(err)
    }
  }
  const handleSortAZ = async () => {
    try {
      const res = await sortAZ('authors')
      dispatch(setDataAuthor(res))
    } catch (err) {
      console.log(err)
    }
  }
  const handleSortZA = async () => {
    try {
      const res = await sortZA('authors')
      dispatch(setDataAuthor(res))
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <>
      <div className='w-full h-screen'>
        <div className='w-full p-4'>
          <TitleTable title='Tác giả' nameButton='Thêm tác giả' navigateTo='create_author' />
          <Filter
            setValueInput={setValueInput}
            onSearch={handleOnClickSearch}
            sortAZ={handleSortAZ}
            sortZA={handleSortZA}
          />
          <AuthorTable />
          <Pagination pageCount={3} />
        </div>
      </div>
    </>
  )
}
export default Author
