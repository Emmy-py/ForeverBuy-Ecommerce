import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { backendUrl } from '../App'

const Login = ({ setToken }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post(`${backendUrl}/api/user/admin`, { email, password })
      if (res.data.success) {
        localStorage.setItem('token', res.data.token)
        setToken(res.data.token)
      } else {
        toast.error(res.data.message)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white shadow-md rounded-lg px-8 py-6 w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-6 text-center">Admin Panel</h1>
        <form onSubmit={onSubmitHandler} className="flex flex-col gap-4">
          <div>
            <p className="text-sm font-medium text-gray-700 mb-1">Email Address</p>
            <input
              onChange={e => setEmail(e.target.value)}
              value={email}
              className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none focus:border-gray-500"
              type="email"
              placeholder="your@email.com"
              required
            />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700 mb-1">Password</p>
            <input
              onChange={e => setPassword(e.target.value)}
              value={password}
              className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none focus:border-gray-500"
              type="password"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="mt-2 w-full py-2 px-4 rounded-md text-white bg-black hover:bg-gray-800 transition-colors"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
