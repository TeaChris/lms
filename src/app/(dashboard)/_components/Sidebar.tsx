import Logo from './Logo'
import SidebarRoutes from './sidebar-routes'

export default function Sidebar() {
  return (
    <div className="h-full border-r flex flex-col overflow-y-auto bg-white  shadow-sm">
      <div className="p-6 flex items-center gap-2">
        <Logo />
        <h2 className="bg-gradient-to-tr from-black via-blue-500 to-blue-700 bg-clip-text text-transparent font-extrabold text-xl">
          Ber
        </h2>
      </div>
      <div className="flex flex-col w-full">
        <SidebarRoutes />
      </div>
    </div>
  )
}
