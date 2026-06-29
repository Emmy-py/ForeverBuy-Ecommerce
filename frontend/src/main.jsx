import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ShopContextProvider from './context/ShopContext.jsx'

const router = createBrowserRouter([
  { path: '*', element: <App /> },
])

createRoot(document.getElementById('root')).render(
  <ShopContextProvider>
    <RouterProvider router={router} />
  </ShopContextProvider>,
)
