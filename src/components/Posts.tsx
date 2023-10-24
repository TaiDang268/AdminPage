import { useContext, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Swal from 'sweetalert2'

import { deleteById, getTotalRecord, searchByName, sortAZ, sortZA } from '~/api'
import { Theme } from '~/hooks/useContext'
import { useQueryString } from '~/hooks/useQuery'
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
  const [selectedListItem, setSelectedListItem] = useState<string[]>([])
  const query = useQueryString()
  const { data: postsResponse, refetch } = useGetPostsQuery(query)
  const [searchParams, setSearchParams] = useSearchParams()
  const initialPage = searchParams.get('_page') || '1'
  const [currentPage, setCurrentPage] = useState<number>(parseInt(initialPage))
  console.log('🚀 ~ file: Posts.tsx:28 ~ Posts ~ currentPage:', currentPage)
  useEffect(() => {
    setSearchParams(`?${new URLSearchParams({ ...query, _page: currentPage.toString() })}`)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage])
  useEffect(() => {
    if (postsResponse) {
      dispatch(setDataPost(postsResponse))
    }
  }, [dispatch, postsResponse])

  const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected + 1)
  }

  useEffect(() => {
    setSearchParams(`?${new URLSearchParams({ ...query, _limit: perPage })}`)
    const handlePageCount = async () => {
      try {
        const res = await getTotalRecord('posts')
        setPageCount(Math.ceil(res / Number(perPage)))
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu:', error)
      }
    }
    handlePageCount()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [perPage])

  const handleDeleteMultiple = () => {
    if (selectedListItem.length == 0) {
      Swal.fire({
        title: 'Cảnh báo',
        text: `Chưa có bài viết nào được chọn`,
        icon: 'warning',
        showCancelButton: true,
        cancelButtonColor: '#186E25',
        showConfirmButton: false,
        cancelButtonText: 'Quay lại'
      })
    } else {
      const postsName = selectedListItem.map((item) => {
        const post = postsResponse?.find((post) => post.id == item)
        return post ? post.name : ''
      })
      Swal.fire({
        title: 'Bạn chắc chứ?',
        text: `Sau khi đồng ý, các bài viết sau sẽ bị xóa khỏi danh sách: ${postsName}`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#186E25',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Đồng ý',
        cancelButtonText: 'Hủy'
      }).then((result) => {
        if (result.isConfirmed) {
          selectedListItem.forEach(async (item) => {
            await deleteById('posts', item)
          })
          refetch()
          setSelectedListItem([])
        }
      })
    }
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
          <TitleTable title='Danh sách báo cáo' nameButton='Báo cáo mới' navigateTo='create_posts' />
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
