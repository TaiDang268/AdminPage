import { useContext } from 'react'

import { Theme } from '~/hooks/useContext'

const Select = () => {
  const { perPage, setPerPage } = useContext(Theme)
  return (
    <div className=''>
      <select
        className='h-[30px] outline-none w-[40px] border border-[#D5D8DD]'
        onChange={(e) => setPerPage(e.target.value)}
        value={perPage}
      >
        <option value='5'>5</option>
        <option value='7'>7</option>
        <option value='9'>9</option>
      </select>
    </div>
  )
}
export default Select
