const PostsTable = () => {
  return (
    <>
      <div className='w-full mt-3'>
        <table>
          <tr className='text-white bg-primary'>
            <th className='th-checkbox'>
              <input type='checkbox' />
            </th>
            <th className='w-[60px] '>ID</th>
            <th className='w-[400px]'>Tên bài viết </th>
            <th>Mô tả </th>
            <th>Tác giả </th>
            <th>Chủ đề </th>
            <th className='w-[140px]'>Ngày đăng bài </th>
            <th>Thao tác </th>
          </tr>

          <tr>
            <th>
              <input type='checkbox' />
            </th>
            <td className='text-center'>1</td>
            <td>Mexico</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </table>
      </div>
    </>
  )
}
export default PostsTable
