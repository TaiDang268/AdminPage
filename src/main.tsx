// eslint-disable-next-line import/default
import React from 'react'
// eslint-disable-next-line import/default
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'

// eslint-disable-next-line import/order
import App from './App.tsx'

import './index.css'
import 'react-tooltip/dist/react-tooltip.css'

import { ProviderContext } from './hooks/useContext.tsx'
import { store } from './redux/store.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ProviderContext>
        <App />
      </ProviderContext>
    </Provider>
  </React.StrictMode>
)
