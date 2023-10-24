import axios from 'axios'
import { useEffect, useState } from 'react'
import SelectNpm from 'react-select'

import { IAuthor } from '~/types/interfaces'

export default function Statistic() {
  const [author, setAuthor] = useState<IAuthor[]>([])
  const [selectedOption, setSelectedOption] = useState<any>(null)
  const [query, setQuery] = useState<string[]>([])
  useEffect(() => {
    axios
      .get('http://localhost:3007/authors')
      .then((resp) => {
        const res = resp.data
        setAuthor(res)
        console.log(res)
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
  }, [selectedOption])
  return (
    <div className='p-5'>
      <p className='font-bold'>Thống kê theo tác giả</p>
      <SelectNpm
        defaultValue={selectedOption}
        onChange={setSelectedOption}
        options={author.map((item) => ({ value: item.name, label: item.name }))}
        isMulti
      />
    </div>
  )
}
