import { assets } from '../assets/assets'

const Navbar = ({ setToken }) => {
  const handleLogout = () => {
    setToken('')
    localStorage.removeItem('token')
  }

  return (
    <div className="flex items-center py-2 px-[4%] justify-between border-b bg-white">
      <div className="flex flex-col">
        <img src={assets.logo} alt="logo" className="w-[max(10%,80px)]" />
        <p className="text-[10px] tracking-widest text-pink-400 font-medium -mt-1 ml-0.5">
          ADMIN PANEL
        </p>
      </div>
      <button
        onClick={handleLogout}
        className="bg-gray-700 hover:bg-gray-800 text-white px-6 py-2 rounded-full text-sm transition-colors"
      >
        Logout
      </button>
    </div>
  )
}

export default Navbar
