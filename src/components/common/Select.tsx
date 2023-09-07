const options = [
  { label: '10', value: 1 },
  { label: '20', value: 2 },
  { label: '50', value: 3 }
]

const Select = () => {
  return (
    <div className=' '>
      <select className='h-[30px] outline-none w-[40px] border border-[#D5D8DD]'>
        <option>10</option>
        <option>20</option>
        <option>50</option>
      </select>
    </div>
  )
}
export default Select
