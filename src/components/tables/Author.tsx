const AuthorTable = () => {
  return (
    <>
      <div className='w-full mt-3'>
        <table>
          <tr className='text-white bg-primary'>
            <th className='th-checkbox'>
              <input type='checkbox' />
            </th>
            <th>Tên tác giả </th>

            <th>Thao tác </th>
          </tr>

          <tr>
            <th>
              <input type='checkbox' />
            </th>
            <td>Francisco Chang</td>
            <td></td>
          </tr>
        </table>
      </div>
    </>
  )
}
export default AuthorTable
