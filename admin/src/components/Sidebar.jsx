import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'

const navItems = [
  { to: '/add', icon: assets.add_icon, label: 'Add Items' },
  { to: '/list', icon: assets.order_icon, label: 'List Items' },
  { to: '/orders', icon: assets.order_icon, label: 'Orders' },
]

const Sidebar = () => {
  return (
    <div className="w-[18%] min-h-screen border-r bg-white">
      <div className="flex flex-col gap-4 pt-6 pl-[20%] text-[15px]">
        {navItems.map(({ to, icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l transition-colors ${
                isActive ? 'bg-pink-100 border-pink-300 text-pink-700' : 'hover:bg-gray-50'
              }`
            }
          >
            <img src={icon} alt="" className="w-5 h-5" />
            <p className="hidden md:block">{label}</p>
          </NavLink>
        ))}
      </div>
    </div>
  )
}

export default Sidebar
