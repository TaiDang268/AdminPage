import { useContext, useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'

import { deleteById, getTotalRecord, searchByName, sortAZ, sortZA } from '~/api'
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
  const [selectedListItem, setSelectedListItem] = useState<string[]>([])
  const { data: postsResponse, refetch } = useGetPostsQuery({ _limit: perPage, _page: currentPage.toString() })
  useEffect(() => {
    if (postsResponse) {
      dispatch(setDataPost(postsResponse))
    }
  }, [dispatch, postsResponse])

  const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected + 1)
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
  const handleDeleteMultiple = () => {
    selectedListItem.forEach(async (item) => {
      await deleteById('posts', item)
    })
    refetch()
  }
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
          <PostsTable selectedListItem={selectedListItem} setSelectedListItem={setSelectedListItem} />
          <PaginationCustom
            pageCount={pageCount}
            onPageChange={handlePageChange}
            onDeleteMultiple={handleDeleteMultiple}
          />
        </div>
        <ToastContainer />
      </div>
    </>
  )
}
export default Posts
