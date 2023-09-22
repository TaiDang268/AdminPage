import { useContext, useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'

import { getByParams, getTotalRecord, searchByName, sortAZ, sortZA } from '~/api'
import { Theme } from '~/hooks/useContext'
import { setDataPost } from '~/redux/features/PostsSlice'
import { useAppDispatch } from '~/redux/hooks'
import { useGetPostsQuery } from '~/rtk-query/posts.service'

import Filter from './common/Filter'
import PaginationCustom from './common/PaginationCustom'
import TitleTable from './common/TitleTable'
import PostsTable from './tables/PostsTable'
const Posts = () => {
  const dispatch = useAppDispatch()
  const { perPage } = useContext(Theme)
  const [valueInput, setValueInput] = useState<string>('')
  const [pageCount, setPageCount] = useState<number>(1)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const { data: postsResponse } = useGetPostsQuery({ _limit: perPage, _page: '1' })
  useEffect(() => {
    if (postsResponse) {
      dispatch(setDataPost(postsResponse))
    }
  }, [dispatch, postsResponse])
  const handleOnClickSearch = async () => {
    try {
      const res = await searchByName('posts', valueInput, Number(perPage))
      dispatch(setDataPost(res))
    } catch (err) {
      console.log(err)
    }
  }
  const handleSortAZ = async () => {
    try {
      const res = await sortAZ('posts', Number(perPage))
      dispatch(setDataPost(res))
    } catch (err) {
      console.log(err)
    }
  }
  const handleSortZA = async () => {
    try {
      const res = await sortZA('posts', Number(perPage))
      dispatch(setDataPost(res))
    } catch (err) {
      console.log(err)
    }
  }
  const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected + 1)
    const fetchDataAsync = async () => {
      try {
        const res = await getByParams('posts', { _page: selected + 1, _limit: Number(perPage) })
        dispatch(setDataPost(res))
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu:', error)
      }
    }
    fetchDataAsync()
  }

  useEffect(() => {
    const handlePageCount = async () => {
      try {
        const res = await getTotalRecord('posts')
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
          <TitleTable title='Danh sách bài viết' nameButton='Bài viết mới' navigateTo='create_posts' />
          <Filter
            setValueInput={setValueInput}
            onSearch={handleOnClickSearch}
            sortAZ={handleSortAZ}
            sortZA={handleSortZA}
          />
          <PostsTable currentPage={currentPage} />
          <PaginationCustom pageCount={pageCount} onPageChange={handlePageChange} />
        </div>
        <ToastContainer />
      </div>
    </>
  )
}
export default Posts
