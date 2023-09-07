const TopicTable = () => {
  return (
    <>
      <div className='w-full mt-3'>
        <table>
          <tr className='text-white bg-primary'>
            <th className='th-checkbox'>
              <input type='checkbox' />
            </th>
            <th>Tên chủ đề </th>
            <th>Slug</th>
            <th>Số bài viết</th>
            <th>Thao tác</th>
          </tr>

          <tr>
            <th>
              <input type='checkbox' />
            </th>
            <td>Francisco Chang</td>
            <td>Mexico</td>
            <td></td>
            <td></td>
          </tr>
        </table>
      </div>
    </>
  )
}
export default TopicTable
