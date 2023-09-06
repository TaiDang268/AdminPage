import { BrowserRouter } from 'react-router-dom'
import './App.css'

import Routers from './routes'

function App() {
  return (
    // <div className='flex'>
    //   <SideBar />
    //   <div className='w-full p-4'>
    //     <TitleTable title='Danh sách bài viết' nameButton='Bài viết mới' />
    //     <Filter />
    //   </div>
    // </div>
    <BrowserRouter>
      <Routers />
    </BrowserRouter>
  )
}

export default App
