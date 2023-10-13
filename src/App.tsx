import { BrowserRouter } from 'react-router-dom'

import './App.css'
import './css/table.css'
import 'reactjs-popup/dist/index.css'
import './css/custom.css'
import 'react-toastify/dist/ReactToastify.css'
import Routers from './routes'

// eslint-disable-next-line import/order
import { ConfigProvider } from 'antd'
function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#186E25'
        }
      }}
    >
      <BrowserRouter>
        <Routers />
      </BrowserRouter>
    </ConfigProvider>
  )
}

export default App
