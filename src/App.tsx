import { BrowserRouter } from 'react-router-dom'

import './App.css'
import './css/table.css'
import 'reactjs-popup/dist/index.css'
import './css/custom.css'
import 'react-toastify/dist/ReactToastify.css'
import Routers from './routes'

function App() {
  return (
    <BrowserRouter>
      <Routers />
    </BrowserRouter>
  )
}

export default App
