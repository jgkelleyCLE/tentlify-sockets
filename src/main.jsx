import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ChakraProvider } from '@chakra-ui/react'
import { Provider } from 'react-redux'
import { store } from './redux/store.js'
import 'mapbox-gl/dist/mapbox-gl.css';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <ChakraProvider>
    <App />
  </ChakraProvider>
  </Provider>
)
