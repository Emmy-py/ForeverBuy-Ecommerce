import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Add from './pages/Add'
import List from './pages/List'
import Orders from './pages/Orders'
import Login from './pages/Login'

export const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000'

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token') || '')

  if (!token) {
    return (
      <>
        <ToastContainer />
        <Login setToken={setToken} />
      </>
    )
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <ToastContainer />
      <Navbar setToken={setToken} />
      <div className="flex w-full">
        <Sidebar />
        <div className="w-full mx-auto ml-[max(5vw,25px)] my-8 pr-4 text-gray-600 text-base">
          <Routes>
            <Route path="/" element={<Add token={token} />} />
            <Route path="/add" element={<Add token={token} />} />
            <Route path="/list" element={<List token={token} />} />
            <Route path="/orders" element={<Orders token={token} />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default App
