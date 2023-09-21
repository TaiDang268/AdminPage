import { useContext, useEffect, useState } from 'react'

import { getByParams, getTotalRecord, searchByName, sortAZ, sortZA } from '~/api'
import { Theme } from '~/hooks/useContext'
import { setDataAuthor } from '~/redux/features/AuthorSlice'
import { useAppDispatch } from '~/redux/hooks'

import Filter from './common/Filter'
import Pagination from './common/PaginationCustom'
import TitleTable from './common/TitleTable'
import AuthorTable from './tables/AuthorTable'

const Author = () => {
  const dispatch = useAppDispatch()
  const { perPage } = useContext(Theme)
  const [valueInput, setValueInput] = useState<string>('')
  const [pageCount, setPageCount] = useState<number>(1)

  const handleOnClickSearch = async () => {
    try {
      const res = await searchByName('authors', valueInput, Number(perPage))
      dispatch(setDataAuthor(res))
    } catch (err) {
      console.log(err)
    }
  }
  const handleSortAZ = async () => {
    try {
      const res = await sortAZ('authors', Number(perPage))
      dispatch(setDataAuthor(res))
    } catch (err) {
      console.log(err)
    }
  }
  const handleSortZA = async () => {
    try {
      const res = await sortZA('authors', Number(perPage))
      dispatch(setDataAuthor(res))
    } catch (err) {
      console.log(err)
    }
  }
  const handlePageChange = ({ selected }: { selected: number }) => {
    const fetchDataAsync = async () => {
      try {
        const res = await getByParams('authors', { _page: selected + 1, _limit: Number(perPage) })
        dispatch(setDataAuthor(res))
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu:', error)
      }
    }
    fetchDataAsync()
  }

  useEffect(() => {
    const handlePageCount = async () => {
      try {
        const res = await getTotalRecord('authors')
        setPageCount(Math.ceil(res / Number(perPage)))
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu:', error)
      }
    }
    handlePageCount()
  }, [perPage])
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
          <Pagination pageCount={pageCount} onPageChange={handlePageChange} />
        </div>
      </div>
    </>
  )
}
export default Author
