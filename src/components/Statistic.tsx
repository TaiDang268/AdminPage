import axios from 'axios'
import { useEffect, useState } from 'react'
import SelectNpm from 'react-select'

import { IAuthor, IPosts } from '~/types/interfaces'

export default function Statistic() {
  const [author, setAuthor] = useState<IAuthor[]>([])
  const [selectedOption, setSelectedOption] = useState<any>(null)
  const [query, setQuery] = useState<string[]>([])
  const [dataPosts, setDataPost] = useState<IPosts[]>([])
  useEffect(() => {
    axios
      .get('http://localhost:3007/authors')
      .then((resp) => {
        const res = resp.data
        setAuthor(res)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])
  useEffect(() => {
    if (selectedOption) {
      const selectedAuthor = selectedOption.map((option: any) => option.value)
      setQuery(selectedAuthor)
    }
    axios
      .get(`http://localhost:3007/posts?q=${selectedOption}`)
      .then((resp) => {
        const res = resp.data
        setDataPost(res)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [selectedOption])
  console.log(selectedOption)
  return (
    <div className='p-5'>
      <p className='font-bold'>Thống kê theo tác giả</p>
      <SelectNpm
        defaultValue={selectedOption}
        onChange={(choice) => setSelectedOption(choice)}
        options={author.map((item) => ({ value: item.name, label: item.name }))}
        isMulti
      />
      <div className='mt-5'>
        <table>
          <thead>
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
          </thead>
          <tbody>
            {dataPosts?.map((item: IPosts, index) => (
              <tr key={item.id} className='cursor-pointer'>
                <th>
                  <input
                    type='checkbox'
                    // onChange={(e) => handleChangeInput(e.target.checked, item.id)}
                    // ref={(el) => (inputRefs.current[index] = el)}
                  />
                </th>
                <td className='text-center'>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.short_desc}</td>
                <td>{item.author}</td>
                <td>{item.title}</td>
                <td>{item.date}</td>
                <td className=''>
                  <div className='flex justify-center'>
                    {/* <Action onDelete={() => handleClickTrash(item)} onEdit={() => handleClickEdit(item)} /> */}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
