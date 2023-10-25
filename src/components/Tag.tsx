import { useContext, useEffect, useState } from 'react'

import { getByParams, getTotalRecord, searchByName } from '~/api'
import { Theme } from '~/hooks/useContext'
import useSort from '~/hooks/useSort'
import { setDataTag } from '~/redux/features/TagSlice'
import { useAppDispatch } from '~/redux/hooks'

import Filter from './common/Filter'
import Pagination from './common/PaginationCustom'
import TitleTable from './common/TitleTable'
import TagTable from './tables/TagTable'

const Tag = () => {
  const dispatch = useAppDispatch()
  const { perPage } = useContext(Theme)
  const [valueInput, setValueInput] = useState<string>('')
  const [pageCount, setPageCount] = useState<number>(1)
  const { handleSortAZ, handleSortZA } = useSort('tags', Number(perPage), setDataTag)

  const handleOnClickSearch = async () => {
    try {
      const res = await searchByName('tags', valueInput, Number(perPage))
      dispatch(setDataTag(res))
    } catch (err) {
      console.log(err)
    }
  }

  const handlePageChange = ({ selected }: { selected: number }) => {
    const fetchDataAsync = async () => {
      try {
        const res = await getByParams('tags', { _page: selected + 1, _limit: Number(perPage) })
        dispatch(setDataTag(res))
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu:', error)
      }
    }
    fetchDataAsync()
  }

  useEffect(() => {
    const handlePageCount = async () => {
      try {
        const res = await getTotalRecord('tags')
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
          <TitleTable title='Tag' nameButton='Thêm tag' navigateTo='create_tag' />
          <Filter
            setValueInput={setValueInput}
            onSearch={handleOnClickSearch}
            sortAZ={handleSortAZ}
            sortZA={handleSortZA}
          />
          <TagTable />
          <Pagination pageCount={pageCount} onPageChange={handlePageChange} />
        </div>
      </div>
    </>
  )
}
export default Tag
